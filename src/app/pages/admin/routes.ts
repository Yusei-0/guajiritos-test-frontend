import { Route } from '@angular/router';
import { ADMIN_ROUTES } from './models';
import { justAdminGuard } from './guards';

export const Routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./admin.component').then((m) => m.AdminComponent),
    title: 'TM - Admin',
    children: [
      {
        path: ADMIN_ROUTES.Base,
        redirectTo: ADMIN_ROUTES.TASKS_LIST,
        pathMatch: 'full',
      },
      {
        path: ADMIN_ROUTES.TASKS_LIST,
        loadComponent: () =>
          import('./pages').then((m) => m.TasksListComponent),
      },
      {
        path: ADMIN_ROUTES.USERS_LIST,
        loadComponent: () =>
          import('./pages/').then((m) => m.UsersListComponent),
        canActivate: [justAdminGuard],
      },
    ],
  },
];
