import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideStore } from '@ngrx/store'
import { usersReducer, USERS_FEATURE_KEY } from './state/users/users.reducers'
import { provideEffects } from '@ngrx/effects'
import * as userEffects from './state/users/users.effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({
      [USERS_FEATURE_KEY]: usersReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideEffects(userEffects),
  ],
}
