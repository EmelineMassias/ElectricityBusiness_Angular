import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {from, NEVER} from 'rxjs';

const EXCLUDED_URLS = ['login'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let toHandle = req;


  //req.url correspond à l'URL de l'API que l'on appelle
  if(EXCLUDED_URLS.some(url => !req.url.includes(url))) {
    console.log("pouet")
    const token = authService.token;
    if(token) {
      // On clone la requête pour ajouter le token d'authentification dans les headers déjà existant de la requête
      toHandle = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    }
    else {
      authService.logout();
      router.navigateByUrl('/connexion');
      return from(NEVER) // NEVER is an observable that never emits any value
    }
  }

  return next(toHandle);
};
