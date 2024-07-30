import { AuthService, JwtService, RefreshTokenManageService } from '@/services';
import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const jwtService = inject(JwtService)

  return next(req).pipe(
    catchError(error => {
      if (error.status === HttpStatusCode.Unauthorized) {

        if(!jwtService.isRefreshing){
          console.log("Estamos refrescando");
          jwtService.isRefreshing = true;
          jwtService.refreshTokenSubject.next(null);

          return authService.refreshToken().pipe(
            tap(
              (response) => {
                console.log("Respuesta");
                console.log(response);

                if(response && response.refreshToken)
                  jwtService.setToken(response.token, response.refreshToken)
              }
            ),
            switchMap(
              (response) => {
                jwtService.isRefreshing = false;
                jwtService.refreshTokenSubject.next(response.token)

                console.log("Terminado de refrescar sin error");

                return next(jwtService.addToken(req, response.token))
              }
            ),
            catchError(
              error => {

                jwtService.isRefreshing = false;

                console.log("Terminado de refrescar con error ");
                authService.logout();
                return throwError(error);
              }
            )
          )
        }
        else
        return jwtService.refreshTokenSubject.pipe(
          switchMap(token => {
            if (token) {
              return next(jwtService.addToken(req, token));
            } else {
              authService.logout();
              return throwError('Token refresh failed');
            }
          })
      )
      }
      else
      return throwError(error);
    })
  );
};
