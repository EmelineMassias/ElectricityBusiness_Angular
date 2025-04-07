import { Injectable } from '@angular/core';
import {Utilisateur} from '../../entities/utilisateur/utilisateur';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private _currentUser$: BehaviorSubject<Utilisateur | undefined> = new BehaviorSubject<Utilisateur | undefined>(undefined)
  currentUser$ = this._currentUser$.asObservable() // lecture seule

  set currentUser (user: Utilisateur | undefined) {
    this._currentUser$.next(user)
  }

  get currentUser (): Utilisateur | undefined {
    return this._currentUser$.getValue()
  }
}
