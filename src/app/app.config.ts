import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { clientsFeature } from './views/clients/+state/clients.reducer';
import { API_URL } from './core/tokens/api-url.token';
import { environment } from '../environments/environment';
import * as ClientsEffects from './views/clients/+state/clients.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      [clientsFeature.name]: clientsFeature.reducer
    }),
    provideEffects(ClientsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEnvironmentNgxMask(),
    {
      provide: API_URL,
      useValue: environment.api_url
    }
  ]
};
