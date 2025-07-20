import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {environment} from '../../../environments/environment.development';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
 constructor(public authService: AuthService, private router: Router) {}

  imageUrl: string = environment.IMAGE_URL;
  logout(){
   this.authService.logout();
   this.router.navigate(['/connexion']);
  }
}
