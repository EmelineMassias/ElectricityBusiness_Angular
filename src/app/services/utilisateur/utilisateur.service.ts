import { Injectable } from '@angular/core';
import {Utilisateur} from '../../entities/utilisateur/utilisateur';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {UtilisateurDto} from '../../entities/utilisateurDto/utilisateurDto';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private _currentUser$: BehaviorSubject<Utilisateur | undefined> = new BehaviorSubject<Utilisateur | undefined>(undefined)
  currentUser$ = this._currentUser$.asObservable() // lecture seule
  private url: string;

  constructor(private http: HttpClient) {this.url = environment.API_URL + environment.API_RESOURCES.USERS}

  set currentUser (user: Utilisateur | undefined) {
    this._currentUser$.next(user)
  }

  get currentUser (): Utilisateur | undefined {
    return this._currentUser$.getValue()
  }

addPictureWithFile(formData: FormData): Observable<UtilisateurDto> {
    return this.http.post<UtilisateurDto>(this.url + "/photoProfil", formData);
}



}
