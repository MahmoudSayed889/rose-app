import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const _toastService = inject(ToastService)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMessage = error.error?.message || 'حدث خطأ غير متوقع، يرجى المحاولة لاحقاً';
      
      _toastService.toaster('error', errorMessage)
      
      return throwError(() => error);
    })
  )
};
