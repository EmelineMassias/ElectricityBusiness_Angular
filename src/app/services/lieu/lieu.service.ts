import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LieuHttp} from '../../entities/lieu/lieu';

@Injectable({
  providedIn: 'root'
})
export class LieuService {
private apiUrl = environment.API_URL + '/lieux';
  constructor(private http: HttpClient) { }

  getAllLieux(): Observable<LieuHttp[]> {
    return this.http.get<LieuHttp[]>(this.apiUrl);
  }

  getAllVilles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/villes`);
  }

  getLieuById(id: number): Observable<LieuHttp> {
    return this.http.get<LieuHttp>(`${this.apiUrl}/${id}`);
  }

  saveLieu(lieu: LieuHttp): Observable<LieuHttp> {
    if (lieu.id) {
      return this.http.put<LieuHttp>(`${this.apiUrl}/${lieu.id}`, lieu);
    } else {
      return this.http.post<LieuHttp>(this.apiUrl, lieu);
    }
  }

  deleteLieu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
