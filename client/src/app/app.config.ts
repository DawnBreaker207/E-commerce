import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth } from 'angular-auth-oidc-client';
import { routes } from './app-routing.module';
import { authConfig } from './core/config/auth.config';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { TokenInterceptor } from './core/interceptor/token.interceptor';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor, TokenInterceptor])),
    provideAuth(authConfig),
    DatePipe,
    provideAnimationsAsync(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        // appearance: 'outline',
        subscriptSizing: 'dynamic',
      },
    },
  ],
};
