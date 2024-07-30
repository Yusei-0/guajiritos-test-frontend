import { FlightService, LoaderService } from '@/services';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const loader = inject(LoaderService);
  const flightService = inject(FlightService);
  let isPhotoPending = false;

  const suscription  = flightService.pendingPhoto$.subscribe(
    res => {
      isPhotoPending = res;
    }
  )


  if(!isPhotoPending)
  loader.showLoader();

  return next(req).pipe(
       catchError(error => {
       return throwError(error);
    }),
      finalize(() => {
     loader.hideLoader();
     flightService.updatePhotoPendingData(false)
     suscription.unsubscribe();
    })
  );
};
