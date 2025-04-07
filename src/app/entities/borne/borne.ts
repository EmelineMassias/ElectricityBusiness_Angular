import {Reservation, ReservationHttp} from '../reservation/reservation';
import {Media, MediaHttp} from '../media/media';
import {Utilisateur, UtilisateurHttp} from '../utilisateur/utilisateur';
import {Lieu, LieuHttp} from '../lieu/lieu';

export interface BorneHttp {
  id: number,
  nomBorne: string,
  puissance: string,
  estDisponible: boolean,
  instruction: string,
  surPied: boolean,
  latitude: number,
  longitude: number,
  prix: number,
  photo: string,
  utilisateur: UtilisateurHttp,
  lieu: LieuHttp,
  medias: MediaHttp[],
  reservations: ReservationHttp[]
}

export interface Borne {
  id: number,
  nomBorne: string,
  puissance: string,
  estDisponible: boolean,
  instruction: string,
  surPied: boolean,
  latitude: number,
  longitude: number,
  prix: number,
  photo: string,
  utilisateur: Utilisateur,
  lieu: Lieu,
  medias: Media[]
  reservations: Reservation[]

}

export namespace Borne {
  export function fromHttp(http: BorneHttp): Borne {
    return {
      id: http.id,
      nomBorne: http.nomBorne,
      puissance: http.puissance,
      estDisponible: http.estDisponible,
      instruction: http.instruction,
      surPied: http.surPied,
      latitude: http.latitude,
      longitude: http.longitude,
      prix: http.prix,
      photo: http.photo,
      utilisateur:Utilisateur.fromHttp(http.utilisateur),
      lieu:Lieu.fromHttp(http.lieu),
      medias:http.medias ? http.medias.map(media=> Media.fromHttp(media)):[],
      reservations:http.reservations ? http.reservations.map(reservation=> Reservation.fromHttp(reservation)):[]
    }
  }
}
