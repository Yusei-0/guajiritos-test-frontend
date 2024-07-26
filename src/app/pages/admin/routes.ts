import { Route } from '@angular/router';

export const Routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./admin.component').then((m) => m.AdminComponent),
  },
];
