import { Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  isRefreshing = false;

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') || '';
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  get refreshToken$(): Observable<any> {
    return this.refreshTokenSubject.asObservable();
  }
}
