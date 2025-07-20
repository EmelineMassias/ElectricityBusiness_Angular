import { Component, inject, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {CommonModule, JsonPipe} from '@angular/common';
import { BorneService } from '../../../services/borne/borne.service';
import { Borne, BorneHttp } from '../../../entities/borne/borne'; // Assurez-vous d'avoir BorneHttp si vous l'utilisez toujours
import { LieuService } from '../../../services/lieu/lieu.service';
import { Lieu } from '../../../entities/lieu/lieu';


interface BorneSearchCriteria {
  ville: string | null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  startTime: { hour: number, minute: number } | null;
  endTime: { hour: number, minute: number } | null;
}

@Component({
  selector: 'app-find-borne',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, CommonModule, JsonPipe, NgbTimepickerModule],
  templateUrl: './find-borne.component.html',
  styleUrl: './find-borne.component.scss'
})
export class FindBorneComponent implements OnInit {
  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);
  borneService = inject(BorneService);
  lieuService = inject(LieuService);
  hoveredDate: NgbDate | null = null;

  // Initialisez les critères de recherche
  searchCriteria: BorneSearchCriteria = {
    ville: null,
    fromDate: null,
    toDate: null,
    startTime: null,
    endTime: null,
  };

  bornes: Borne[] = [];
  villesDisponibles: string[] = [];

  ngOnInit(): void {

    this.loadVilles();
    // Initialisez les dates et heures par défaut si vous le souhaitez
    this.searchCriteria.fromDate = this.calendar.getToday();
    this.searchCriteria.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    this.searchCriteria.startTime = { hour: 0, minute: 0 };
    this.searchCriteria.endTime = { hour: 23, minute: 59 };

    // Au lieu de charger toutes les bornes de l'utilisateur au début,
    // vous pouvez appeler searchBornes() ici si vous voulez afficher toutes les bornes par défaut
    // ou laisser vide pour que l'utilisateur recherche d'abord.
    // Pour l'instant, je le laisse vide pour forcer une recherche.
    // Si vous voulez afficher les bornes de l'utilisateur par défaut, appelez this.searchBornes();
  }

  loadVilles(): void {
    this.lieuService.getAllVilles().subscribe({ // Assurez-vous que votre LieuService a cette méthode
      next: (villesResponse: string[]) => { // Indicate expected types from API

        this.villesDisponibles = [...new Set(villesResponse)].sort();
        console.log('Villes disponibles chargées:', this.villesDisponibles);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des villes:', error);
        this.villesDisponibles = []; // Ensure UI reflects no cities if there's an error
      }
    });
  }


  // Nouvelle méthode pour gérer la recherche
  searchBornes(): void {
    console.log('Critères de recherche :', this.searchCriteria);

    // Vous devrez adapter cette partie quand vous aurez le service backend
    // Pour l'instant, simulons un appel de service ou appelons getBornesUtilisateur
    // Si vous voulez faire une recherche filtrée, vous aurez besoin d'un nouveau endpoint côté Spring Boot.

    // Exemple temporaire : réutiliser getBornesUtilisateur pour montrer des données
    // Plus tard, vous appellerez un service spécifique comme borneService.searchBornes(this.searchCriteria)
    this.borneService.getBornesUtilisateur().subscribe({
      next: (bornesHttp: BorneHttp[]) => {
        // Logique de filtrage côté client temporaire si vous n'avez pas encore de backend de recherche
        // Ou directement afficher si le backend gère le filtrage
        this.bornes = bornesHttp.map(b => Borne.fromHttp(b));
        // Ici, vous pourriez ajouter un filtrage côté client si le backend ne le fait pas encore
        // Exemple très simple de filtrage par ville si le backend retourne toutes les bornes de l'utilisateur
        // if (this.searchCriteria.ville) {
        //   this.bornes = this.bornes.filter(borne => borne.lieu?.ville === this.searchCriteria.ville);
        // }
      },
      error: (error) => console.error('Erreur lors de la recherche des bornes', error)
    });
  }

  onDateSelection(date: NgbDate) {
    if (!this.searchCriteria.fromDate && !this.searchCriteria.toDate) {
      this.searchCriteria.fromDate = date;
    } else if (this.searchCriteria.fromDate && !this.searchCriteria.toDate && date && date.after(this.searchCriteria.fromDate)) {
      this.searchCriteria.toDate = date;
    } else {
      this.searchCriteria.toDate = null;
      this.searchCriteria.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.searchCriteria.fromDate && !this.searchCriteria.toDate && this.hoveredDate && date.after(this.searchCriteria.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.searchCriteria.toDate && date.after(this.searchCriteria.fromDate) && date.before(this.searchCriteria.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.searchCriteria.fromDate) ||
      (this.searchCriteria.toDate && date.equals(this.searchCriteria.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
