import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Reservation} from '../../entities/reservation/reservation';
import {lastValueFrom, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.API_URL + environment.API_RESOURCES.PRODUCTS
  }

  list(): Promise<Reservation[]> {
    const obs = this.http
      .get<ReservationHttp[]>(this.url)
      .pipe(
        map(productsHttp => productsHttp.map(p => Reservation.fromHttp(p)))
      )
    return lastValueFrom(obs)
  }

  getById(id: number): Promise<Reservation> {
    const obs = this.http
      .get<ReservationHttp>(`${this.url}/${id}`)
      .pipe(
        map(productHttp => Reservation.fromHttp(productHttp))
      )
    return lastValueFrom(obs)
  }
}
