import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ConnexionComponent } from '../connexion/connexion.component';

@Component({
  selector: 'app-starting-page',
  standalone: true,
  imports: [ConnexionComponent],
  templateUrl: './starting-page.component.html',
  styleUrl: './starting-page.component.scss'
})
export class StartingPageComponent {

  constructor(private router: Router) {}

  goToConnexion() {
    this.router.navigateByUrl('/connexion');
  }
}
