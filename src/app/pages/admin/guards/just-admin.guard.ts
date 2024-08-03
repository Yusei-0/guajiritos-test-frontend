import { UserService } from '@/services';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const justAdminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  const userRole = userService.getUserRole();

  return userRole === 'admin';
};
