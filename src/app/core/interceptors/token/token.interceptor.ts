import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  let token = cookieService.get('user');

  if (token) {
    token = token.replace(/^"|"$/g, '');

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        token: token
      }
    });

    return next(clonedRequest);
  }

  return next(req);
};
