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

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
  setToken(token: string) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  removeToken() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }

  getToken(): string {
    if (this.isBrowser()) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  setRefreshToken(refreshToken: string) {
    if (this.isBrowser()) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }

  addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
