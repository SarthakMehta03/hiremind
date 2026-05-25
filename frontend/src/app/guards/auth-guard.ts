import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);

  const router = inject(Router);

  console.log(
    'Guard Running'
  );

  console.log(
    'Token:',
    authService.getToken()
  );

  console.log(
    'Logged In:',
    authService.isLoggedIn()
  );

  if (authService.isLoggedIn()) {

    return true;

  } else {

    router.navigate(['/login']);

    return false;

  }

};