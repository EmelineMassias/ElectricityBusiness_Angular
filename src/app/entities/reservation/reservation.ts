import {Time} from '@angular/common';
import {Utilisateur, UtilisateurHttp} from '../utilisateur/utilisateur';
import {Borne, BorneHttp} from '../borne/borne';

export interface ReservationHttp {
  id: number,
  dateDebut: string,
  dateFin: string,
  heureDebut: string,
  heureFin: string,
  utilisateur: UtilisateurHttp,
  borne: BorneHttp
}

export interface Reservation {
  id: number,
  dateDebut: Date,
  dateFin: Date,
  heureDebut: string,
  heureFin: string,
  utilisateur: Utilisateur,
  borne: Borne
}

export namespace Reservation {
  export function fromHttp(http: ReservationHttp): Reservation {
    return {
      id: http.id,
      dateDebut: new Date(http.dateDebut),
      dateFin: new Date(http.dateFin),
      heureDebut: http.heureDebut,
      heureFin: http.heureFin,
      utilisateur:Utilisateur.fromHttp(http.utilisateur),
      borne:Borne.fromHttp(http.borne)
    }
  }
}
