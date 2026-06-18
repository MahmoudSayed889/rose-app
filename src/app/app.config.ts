import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { AUTH_API_URL } from 'auth-library';

import { provideTranslateService } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";

import { CookieService } from 'ngx-cookie-service';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { MessageService } from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        errorInterceptor
      ])
    ),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark'
        }
      }
    }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      }),
    }),
    CookieService,
    MessageService,
    {
      provide: AUTH_API_URL,
      useValue: 'https://rose-app.elevate-bootcamp.cloud'
    }
  ]
};
