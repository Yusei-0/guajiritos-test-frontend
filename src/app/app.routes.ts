import { Routes } from '@angular/router';
import { APP_ROUTES } from './models';
import { authGuard } from './guards/';

export const routes: Routes = [
  {
    path: APP_ROUTES.Public.Base,
    redirectTo: APP_ROUTES.Public.Login,
    pathMatch: 'full',
  },
  {
    path: APP_ROUTES.Public.Login,
    loadComponent: () => import('./pages/').then((m) => m.LoginComponent),
  },
  {
    path: APP_ROUTES.Private.Admin,
    loadChildren: () => import('./pages/').then((m) => m.Routes),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./pages').then((m) => m.NotFoundComponent),
  },
];
