import {Reservation, ReservationHttp} from '../reservation/reservation';
import {Media, MediaHttp} from '../media/media';
import {Utilisateur, UtilisateurHttp} from '../utilisateur/utilisateur';
import {Lieu, LieuHttp} from '../lieu/lieu';

export interface BorneHttp {
  id?: number,
  nomBorne: string,
  puissance: string,
  estDisponible: boolean,
  instruction: string,
  surPied: boolean,
  latitude: number,
  longitude: number,
  prix: number,
  photo?: string,
  utilisateurId?: number,
  lieuId?: number,
  mediasId?: number[],
  reservationsId?: number[]
}

export interface Borne {
  id?: number,
  nomBorne: string,
  puissance: string,
  estDisponible: boolean,
  instruction: string,
  surPied: boolean,
  latitude: number,
  longitude: number,
  prix: number,
  photo?: string,
  utilisateur?: Utilisateur,
  lieu?: Lieu,
  medias?: Media[]
  reservations?: Reservation[]

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
      utilisateur: undefined,
      lieu: undefined,
      medias: undefined,
      reservations: undefined
    }
  }

  export function toHttp(borne: Borne): BorneHttp {
    return {
      id: borne.id,
      nomBorne: borne.nomBorne,
      puissance: borne.puissance,
      estDisponible: borne.estDisponible,
      instruction: borne.instruction,
      surPied: borne.surPied,
      latitude: borne.latitude,
      longitude: borne.longitude,
      prix: borne.prix,
      photo: borne.photo,
      utilisateurId: borne.utilisateur?.id, // Utilise l'ID de l'objet utilisateur
      lieuId: borne.lieu?.id,             // Utilise l'ID de l'objet lieu
      mediasId: borne.medias?.map(m => m.id), // Map les objets Media en IDs
      reservationsId: borne.reservations?.map(r => r.id) // Map les objets Reservation en IDs
    };
  }
}
