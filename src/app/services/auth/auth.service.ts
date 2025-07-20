import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {from, lastValueFrom, map, switchMap, tap} from 'rxjs';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {UtilisateurService} from '../utilisateur/utilisateur.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Utilisateur, UtilisateurHttp} from '../../entities/utilisateur/utilisateur';

interface LoginHttp {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token?: string

  private url: string

  constructor (
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    public userService: UtilisateurService
  ) {

    this.url = environment.API_URL + environment.API_RESOURCES.USERS
  }

  async checkLocalStorageToken(): Promise<void> {
    const tokenLocalStorage = this.localStorageService.getItem(environment.LOCAL_STORAGE.ACCESS_TOKEN);
    if (tokenLocalStorage) {
      this.token = tokenLocalStorage;
      try {
        await this.getProfile();
      } catch (error) {
        this.logout(); // Se déconnecter si le profil ne peut pas être récupéré
      }
    } else {
      console.log("Aucun token trouvé dans localStorage.");
    }
  }

  async login(email: string, password: string, remember: boolean): Promise<void> {
    console.log('login', email, password);
    const obs = this.http
      .post<LoginHttp>(`${this.url}/login`, { email, password })
      .pipe(
        tap(res => {
          console.log(res);
          if (remember) {
            this.localStorageService.setItem(environment.LOCAL_STORAGE.ACCESS_TOKEN, res.token);
          }
          this.token = res.token;
          this.userService.currentUser = { email } as Utilisateur;
        }),
        switchMap(() => from(this.getProfile()))
      );
    await lastValueFrom(obs);
  }

  async getProfile(): Promise<Utilisateur> {
    const obs = this.http
      .get<UtilisateurHttp>(`${this.url}/current-user`)
      .pipe(
        tap(userHttp => console.log("Réponse API user:", userHttp)),
        map(userHttp => Utilisateur.fromHttp(userHttp)),
            tap(user => {
              this.userService.currentUser = user;
            })
        );

          return await lastValueFrom(obs);
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout (): void {
    this.localStorageService.removeItem(environment.LOCAL_STORAGE.ACCESS_TOKEN)
    this.userService.currentUser = undefined
    this.token = undefined
  }
}
