import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const email = localStorage.getItem('email');
  const router = inject(Router)
  if(email){
    return true;
  }
  else{
    router.navigate(['/auth/login']);
    return false;
  }
};
