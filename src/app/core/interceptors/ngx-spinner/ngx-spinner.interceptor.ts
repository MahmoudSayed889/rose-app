import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { finalize } from 'rxjs';

export const ngxSpinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(SpinnerService);

  if (req.url.includes('auth') || req.url.includes('users')) {
    return next(req);
  }

  spinner.show();

  return next(req).pipe(
    finalize(() => spinner.hide())
  );
};