// src/app/services/borne/borne.service.ts

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
//import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BorneHttp } from '../../entities/borne/borne'; // Renommé en BorneHttp selon votre fichier

@Injectable({
  providedIn: 'root'
})
export class BorneService {
  private url = `${environment.API_URL}${environment.API_RESOURCES.BORNES}`;

  constructor(private http: HttpClient) {}

  // Méthode existante
  getBornesUtilisateur(): Observable<BorneHttp[]> {
    return this.http.get<BorneHttp[]>(`${this.url}/mes-bornes`);
  }

  // Méthode existante
  deleteBorne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // --- NOUVELLES MÉTHODES À AJOUTER ---

  /**
   * Crée une nouvelle borne.
   * @param borne Le DTO de la borne à créer.
   * @returns Un Observable de la borne créée.
   */
  createBorne(borne: BorneHttp): Observable<BorneHttp> {
    // Le POST ne nécessite pas de formData si votre backend attend directement le JSON
    // Si votre backend attendait un multipart/form-data comme pour l'utilisateur avec photo,
    // il faudrait créer un FormData ici.
    // Pour l'instant, d'après votre BorneControllerRest, il attend un @RequestBody BorneDto
    return this.http.post<BorneHttp>(this.url, borne);
  }

  /**
   * Récupère toutes les bornes.
   * @returns Un Observable d'une liste de bornes.
   */
  getAllBornes(): Observable<BorneHttp[]> {
    return this.http.get<BorneHttp[]>(this.url);
  }

  /**
   * Récupère une borne par son ID.
   * @param id L'ID de la borne.
   * @returns Un Observable de la borne.
   */
  getBorneById(id: number): Observable<BorneHttp> {
    return this.http.get<BorneHttp>(`${this.url}/${id}`);
  }

  /**
   * Met à jour une borne existante.
   * @param id L'ID de la borne à mettre à jour.
   * @param borne Le DTO de la borne avec les données mises à jour.
   * @returns Un Observable de la borne mise à jour.
   */
  updateBorne(id: number, borne: BorneHttp): Observable<BorneHttp> {
    // Le PUT ne nécessite pas de formData si votre backend attend directement le JSON
    return this.http.put<BorneHttp>(`${this.url}/${id}`, borne);
  }


  searchBornes(query: string): Observable<BorneHttp[]> {
    return this.http.get<BorneHttp[]>(`${this.url}/search?q=${query}`);
   }
}
