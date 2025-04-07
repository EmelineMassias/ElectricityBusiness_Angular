import {Borne, BorneHttp} from '../borne/borne';

export interface Media {
  id: number,
  libelle: string,
  typeMedia: string,
  borne: Borne
}

export interface MediaHttp {
  id: number,
  libelle: string,
  typeMedia: string,
  borne: BorneHttp
}

export namespace Media {
  export function fromHttp(http: MediaHttp): Media {
    return {
      id:http.id,
      libelle:http.libelle,
      typeMedia:http.libelle,
      borne:Borne.fromHttp(http.borne)
    }
  }
}
