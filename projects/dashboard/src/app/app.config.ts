import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AUTH_API_URL, tokenInterceptor } from 'auth-library';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouter(appRoutes),
    CookieService,
    {
      provide: AUTH_API_URL,
      useValue: 'https://rose-app.elevate-bootcamp.cloud',
    },
  ],
};
