import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

/**
 * Reads the 'user' cookie (JSON-stringified JWT token string) and attaches
 * Authorization: Bearer <token> (and a `token` header) to outgoing requests.
 */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  let token = cookieService.get('user');

  if (token) {
    token = token.replace(/^"|"$/g, '');

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });

    return next(clonedRequest);
  }

  return next(req);
};
