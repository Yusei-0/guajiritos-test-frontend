import { LoaderService } from '@/services';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  loader.loaderCounter += 1;

  if (loader.loaderCounter > 0) loader.showLoader();

  return next(req).pipe(
    // catchError((error) => {
    //   return throwError(error);
    // }),
    finalize(() => {
      loader.loaderCounter -= 1;

      if (loader.loaderCounter === 0) loader.hideLoader();
    })
  );
};
