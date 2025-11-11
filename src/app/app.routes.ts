import { Routes } from '@angular/router';
import { AppRoute } from './core/constants/const';

export const routes: Routes = [
  {
    path: AppRoute.MAIN,
    title: 'Main',
    loadComponent: () =>
      import('./pages/main/main.component.component').then(
        (m) => m.MainComponentComponent,
      ),
  },
  {
    path: `${AppRoute.OFFER}/:id`,
    title: 'Offer',
    loadComponent: () =>
      import('./pages/offer/offer.component.component').then(
        (m) => m.OfferComponentComponent,
      ),
  },
  {
    path: AppRoute.LOGIN,
    title: 'Login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: AppRoute.FAVORITES,
    title: 'Favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component.component').then(
        (m) => m.FavoritesComponentComponent,
      ),
  },
  {
    path: '**',
    title: '404',
    loadComponent: () =>
      import('./pages/404/404.component').then((m) => m.NotFoundComponent),
  },
];
