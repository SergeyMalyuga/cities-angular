import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { appReducer } from './store/app/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { OfferEffects } from './store/offer/effects/offer.effects';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { CityEffects } from './store/city/effects/city.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(appReducer),
    provideEffects(OfferEffects, CityEffects),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
