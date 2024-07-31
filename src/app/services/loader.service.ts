import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  loaderCounter = 0;

  showLoader() {
    this.isLoadingSubject.next(true);
    console.log('Se puso el loader');
  }

  hideLoader() {
    this.isLoadingSubject.next(false);
    console.log('Se quita el loader');
  }
}
