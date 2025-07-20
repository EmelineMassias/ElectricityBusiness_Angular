import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {Utilisateur} from '../../../entities/utilisateur/utilisateur';
import { DatePipe } from '@angular/common';
import {environment} from '../../../../environments/environment.development';

@Component({
  selector: 'app-profile-page',
  imports: [RouterLink, DatePipe],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {

  constructor( private authService: AuthService, private router: Router) {
  }

  user: Utilisateur | null = null;

  imageUrl: string = environment.IMAGE_URL;
  async ngOnInit() {
    this.user = await this.authService.getProfile();
  console.log(this.user);
  }
}
