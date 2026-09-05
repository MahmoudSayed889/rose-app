import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'auth-library';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';

export const adminGuard: CanActivateFn = (route, state) => {
    const _authService = inject(AuthService);
    const _cookieService = inject(CookieService);
    const _router = inject(Router);

    const token = _cookieService.get('user')

    if (_authService.isAuthenticated() && _authService.getUserRole(token) == 'admin') {
        return true;
    }

    const authUrl = new URL('/login', environment.hostUrl)
    authUrl.searchParams.set('callbackurl', window.location.href)

    window.location.href = authUrl.toString();

    return false;
};