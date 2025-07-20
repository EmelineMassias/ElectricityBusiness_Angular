import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if(authService.token) return true

  //return router.navigateByUrl('/connexion')
  console.warn("AuthGuard blocked access, normally redirecting to /connexion");
  return false;
};
