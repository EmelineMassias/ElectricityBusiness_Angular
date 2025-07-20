// src/app/components/borne/add-borne/add-borne.component.ts (RE-CORRIGÉ)

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BorneService } from '../../../services/borne/borne.service';


// POUR L'ENVOI AU BACKEND (POST/PUT), UTILISEZ CETTE STRUCTURE :
export interface BornePayload {
  id?: number;
  nomBorne: string;
  puissance: string;
  estDisponible: boolean;
  instruction: string;
  surPied: boolean;
  latitude: number;
  longitude: number;
  prix: number;
  photo?: string;
  utilisateurId?: number; // Correspond au DTO Java
  lieuId?: number;     // Correspond au DTO Java
  mediasId?: number[]; // Correspond au DTO Java
  reservationsId?: number[]; // Correspond au DTO Java
}


import { HttpClientModule } from '@angular/common/http';
import {BorneHttp} from '../../../entities/borne/borne';

@Component({
  selector: 'app-add-borne',
  templateUrl: './add-borne.component.html',
  styleUrls: ['./add-borne.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class AddBorneComponent implements OnInit {
  // Utiliser l'interface BornePayload pour l'envoi des données (avec IDs)
  newBorne: BornePayload = {
    nomBorne: '',
    puissance: '',
    estDisponible: true,
    instruction: '',
    surPied: false,
    latitude: 0,
    longitude: 0,
    prix: 0,
    // utilisateurId: undefined, // À définir si un utilisateur est connecté
    // lieuId: undefined, // À définir par le formulaire ou par défaut
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private borneService: BorneService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Si l'utilisateur est connecté, vous pourriez vouloir pré-remplir l'utilisateurId
    // this.newBorne.utilisateurId = votreAuthService.getCurrentUserId();
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.newBorne.nomBorne || !this.newBorne.puissance || this.newBorne.prix === undefined || this.newBorne.prix === null) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires (Nom, Puissance, Prix).';
      return;
    }

    // IMPORTANT : Assurez-vous que lieuId est défini si votre backend l'attend
    if (this.newBorne.lieuId === undefined || this.newBorne.lieuId === null) {
      this.errorMessage = 'Veuillez sélectionner un lieu.';
      return;
    }

    // Appelez createBorne avec le type BornePayload
    this.borneService.createBorne(this.newBorne as BorneHttp).subscribe({
      next: (response) => {
        this.successMessage = 'Borne ajoutée avec succès ! ✅';
        console.log('Borne ajoutée:', response);
        setTimeout(() => {
          this.router.navigate(['/findborne']);
        }, 2000);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la borne:', error);
        this.errorMessage = 'Erreur lors de l\'ajout de la borne. Veuillez réessayer.';
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else if (error.status === 400) {
          this.errorMessage = 'Données invalides. Veuillez vérifier les informations saisies.';
        }
      }
    });
  }
}
