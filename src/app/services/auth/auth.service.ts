import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {lastValueFrom, map, tap} from 'rxjs';
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
    private userService: UtilisateurService
  ) {

    this.url = environment.API_URL + environment.API_RESOURCES.USERS
  }

  async checkLocalStorageToken (): Promise<void> {
    const tokenLocalStorage = this.localStorageService.getItem(environment.LOCAL_STORAGE.ACCESS_TOKEN)
    if (tokenLocalStorage) {
      this.token = tokenLocalStorage
      await this.getProfile()
    }
  }

  async login (email: string, password: string, remember: boolean): Promise<void> {
    const obs = this.http
      .post<LoginHttp>(`${this.url}/login`, { email, password })
      .pipe(
        tap(res => {
          if (remember) {
            this.localStorageService.setItem(environment.LOCAL_STORAGE.ACCESS_TOKEN, res.token)
          }
          this.token = res.token
        }),
        map(async () => {
          await this.getProfile()
          return undefined
        })
      )
    return lastValueFrom(obs)
  }

  async getProfile (): Promise<void> {
    if (!this.token) throw new Error('Aucun jeton n\'a été trouvé.')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    })

    const obs = this.http
      .get<UtilisateurHttp>(`${this.url}/profile`, { headers })
      .pipe(
        map(userHttp => Utilisateur.fromHttp(userHttp)),
        tap(user => this.userService.currentUser = user),
        map(() => undefined)
      )
    return lastValueFrom(obs)
  }

  logout (): void {
    this.localStorageService.removeItem(environment.LOCAL_STORAGE.ACCESS_TOKEN)
    this.userService.currentUser = undefined
    this.token = undefined
  }
}
