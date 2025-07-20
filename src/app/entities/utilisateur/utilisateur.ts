import {Borne, BorneHttp} from '../borne/borne';
import {Reservation, ReservationHttp} from '../reservation/reservation';

export interface UtilisateurHttp {
  id: number
  username: string
  nom: string
  prenom: string
  email: string
  motDePasse: string
  telephone: string
  role: 'locataire' | 'proprietaire'
  dateDeNaissance: string
  numeroRue: number
  nomRue: string
  codePostal: string
  ville: string
  photoProfil: string
  bornes : BorneHttp[]
  reservations: ReservationHttp[]
}

export interface Utilisateur {
  id: number
  username: string
  nom: string
  prenom: string
  email: string
  motDePasse: string
  telephone: string
  role: 'locataire' | 'proprietaire'
  dateDeNaissance: Date
  numeroRue: number
  nomRue: string
  codePostal: string
  ville: string
  photoProfil: string
  bornes : Borne[]
  reservations: Reservation[]
}

export namespace Utilisateur {
  export function fromHttp(http: UtilisateurHttp): Utilisateur{
    return {
      id:http.id,
      username:http.username,
      nom:http.nom,
      prenom:http.prenom,
      email:http.email,
      motDePasse:http.motDePasse,
      telephone:http.telephone,
      role:http.role,
      dateDeNaissance: new Date(http.dateDeNaissance),
      numeroRue:http.numeroRue,
      nomRue:http.nomRue,
      codePostal:http.codePostal,
      ville:http.ville,
      photoProfil: http.photoProfil,
      bornes:http.bornes ? http.bornes.map(borne=> Borne.fromHttp(borne)):[],
      reservations:http.reservations ? http.reservations.map(reservation=> Reservation.fromHttp(reservation)):[]
    }
  }
}

//si ce n'est pas une liste, pas de crochets et borne:Borne.fromHttp(http.borne)
