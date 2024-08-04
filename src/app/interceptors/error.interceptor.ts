import { MESSAGES } from '@/models';
import { NotificationsService } from '@/services';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from '@angular/common/http';
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
          case HttpStatusCode.BadRequest:
            errorMessage = error.error || MESSAGES.ERROR_HTTP[400];
            break;
          case HttpStatusCode.Unauthorized:
            errorMessage = MESSAGES.ERROR_HTTP[401];
            break;
          case HttpStatusCode.Forbidden:
            errorMessage = MESSAGES.ERROR_HTTP[403];
            break;
          case HttpStatusCode.NotFound:
            errorMessage = MESSAGES.ERROR_HTTP[404];
            break;
          case HttpStatusCode.InternalServerError:
            errorMessage = MESSAGES.ERROR_HTTP[500];
            break;
          default:
            errorMessage = MESSAGES.ERROR_HTTP.default;
            break;
        }
      }

      console.log(errorMessage);

      notificationService.openSimpleSnackBar(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
