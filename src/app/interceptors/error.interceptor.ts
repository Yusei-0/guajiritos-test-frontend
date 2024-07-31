import { NotificationsService } from '@/services';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationsService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = '';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Client-side error: ${error.error.message}`;
        console.error('Client-side error:', error.error.message);
      } else {
        // Error del lado del servidor
        errorMessage = `Server-side error: ${error.status} ${error.message}`;
        console.error(`Server-side error: ${error.status} ${error.message}`);

        // Lógica adicional para errores específicos
        switch (error.status) {
          case 400:
            errorMessage = 'Bad Request: Please check your input.';
            console.error('Bad Request: Please check your input.');
            break;
          case 401:
            errorMessage = 'Unauthorized: Please log in again.';
            console.error('Unauthorized: Please log in again.');
            break;
          case 403:
            errorMessage = 'Forbidden: You do not have access.';
            console.error('Forbidden: You do not have access.');
            break;
          case 404:
            errorMessage = 'Not Found: The resource was not found.';
            console.error('Not Found: The resource was not found.');
            break;
          case 500:
            errorMessage = 'Internal Server Error: Please try again later.';
            console.error('Internal Server Error: Please try again later.');
            break;
          default:
            errorMessage = 'An unknown error occurred.';
            console.error('An unknown error occurred.');
            break;
        }
      }

      notificationService.openSimpleSnackBar(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
