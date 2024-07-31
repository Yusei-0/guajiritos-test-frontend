import { APP_ROUTES } from '@/models';
import { AuthService } from '@/services';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLogin()) return router.navigate([APP_ROUTES.Public.Login]);

  return true;
};
