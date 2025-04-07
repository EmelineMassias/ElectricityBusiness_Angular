import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StartingPageComponent } from './pages/starting-page/starting-page.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ProfilePageComponent } from './pages/profile/profile-page/profile-page.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { AddBorneComponent } from './pages/borne/add-borne/add-borne.component';
import { DetailBorneComponent } from './pages/borne/detail-borne/detail-borne.component';
import { EditBorneComponent } from './pages/borne/edit-borne/edit-borne.component';
import { FindBorneComponent } from './pages/borne/find-borne/find-borne.component';
import { AddLieuComponent } from './pages/lieu/add-lieu/add-lieu.component';
import { DetailLieuComponent } from './pages/lieu/detail-lieu/detail-lieu.component';
import { EditLieuComponent } from './pages/lieu/edit-lieu/edit-lieu.component';
import { FindLieuComponent } from './pages/lieu/find-lieu/find-lieu.component';


export const routes: Routes = [
  { path: '', component: StartingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profilepage', component: ProfilePageComponent },
  { path: 'editprofile', component: EditProfileComponent },
  { path: 'addborne', component: AddBorneComponent },
  { path: 'detailborne', component: DetailBorneComponent },
  { path: 'editborne', component: EditBorneComponent },
  { path: 'findborne', component: FindBorneComponent },
  { path: 'addlieu', component: AddLieuComponent },
  { path: 'detaillieu', component: DetailLieuComponent },
  { path: 'editlieu', component: EditLieuComponent },
  { path: 'findlieu', component: FindLieuComponent }
];

