import {Borne, BorneHttp} from '../borne/borne';

export interface LieuHttp {
  id : number,
  nomRue : string,
  codePostal: string,
  ville: string,
  bornes : BorneHttp[]
}

export interface Lieu {
  id : number,
  nomRue : string,
  codePostal: string,
  ville: string,
  bornes : Borne[]
}

export namespace Lieu {
  export function fromHttp (http: LieuHttp): Lieu {
    return {
      id : http.id,
      nomRue : http.nomRue,
      codePostal: http.codePostal,
      ville: http.ville,
      bornes:http.bornes ? http.bornes.map(borne=> Borne.fromHttp(borne)):[],
    }
  }
}
