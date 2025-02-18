import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.error) {
        try {
          const response = error.error as { code: string; description: string };
          errorMessage = response.description || errorMessage;
        } catch (e) {
          errorMessage = 'Error processing server response';
        }
      }

      console.error('HTTP Error:', errorMessage);
      alert(errorMessage); // Show alert to the user

      return throwError(() => new Error(errorMessage));
    })
  );
};
