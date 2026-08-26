import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const _toastService = inject(ToastService)
  const _router = inject(Router)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.error?.message.includes('Invalid or expired token')) {
        _router.navigate(['/login'])
        return throwError(() => error);
      }
      
      const errorMessage = error.error?.message || 'حدث خطأ غير متوقع، يرجى المحاولة لاحقاً';
      
      _toastService.toaster('error', errorMessage)
      
      return throwError(() => error);
    })
  )
};
