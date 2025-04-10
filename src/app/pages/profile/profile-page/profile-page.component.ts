import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {Utilisateur} from '../../../entities/utilisateur/utilisateur';

@Component({
  selector: 'app-profile-page',
  imports: [RouterLink],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router) {
  }

  user: Utilisateur | null = null;

  async ngOnInit() {
    this.user = await this.authService.getProfile();
  console.log(this.user);
  }
}
