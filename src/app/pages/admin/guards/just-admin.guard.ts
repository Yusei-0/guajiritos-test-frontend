import { APP_ROUTES, RoleOptions } from '@/models';
import { UserService } from '@/services';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ADMIN_ROUTES } from '../models';

export const justAdminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const userRole = userService.getUserRole();

  if (userRole === RoleOptions.USER)
    router.navigate([APP_ROUTES.Private.Admin + '/' + ADMIN_ROUTES.TASKS_LIST]);

  return true;
};
