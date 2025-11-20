import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {appReducer} from './store/app/app.reducer';
import {provideEffects} from '@ngrx/effects';
import {OfferEffects} from './store/offer/effects/offer.effects';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi,} from '@angular/common/http';
import {CityEffects} from './store/city/effects/city.effects';
import {UserAuthEffects} from './store/user/effects/user-auth.effects';
import {UserLoginEffects} from './store/user/effects/user-login.effects';
import {AuthInterceptor} from './core/interceptors/auth.interceptor';
import {UserLogoutEffects} from './store/user/effects/user-logout.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(appReducer),
    provideEffects(
      OfferEffects,
      CityEffects,
      UserAuthEffects,
      UserLoginEffects,
      UserLogoutEffects,
    ),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};
