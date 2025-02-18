import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ErrorService } from '../services/error.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMessage = errorService.handleError(error, 'An unexpected error occurred');

      console.error('HTTP Error:', errorMessage);
      alert(errorMessage);

      return throwError(() => new Error(errorMessage));
    })
  );
};
