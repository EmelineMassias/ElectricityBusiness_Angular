import {Component, OnInit} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StartingPageComponent } from './pages/starting-page/starting-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{

  constructor(private authService:AuthService) {
  }

  async ngOnInit(): Promise<void> {
    await this.authService.checkLocalStorageToken()
  }
}

// export class AppComponent {
//   title = 'ElectricityBusiness_Angular';
//
//   showNavBar = true;
//
//   constructor(private router: Router) {
//     this.router.events.subscribe(() => {
//       this.showNavBar = this.router.url !== '/';
//     });
//   }
// }
