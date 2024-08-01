import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { JwtService } from './jwt.service';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthUser, CreateUserDTO, LoginUserDTO } from '@/models/dto';
import { APP_ROUTES, TokensAuthDto } from '@/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  jwt = inject(JwtService);
  router = inject(Router);

  constructor() {}

  register(newUser: CreateUserDTO) {
    console.log(newUser);
    return this.http.post<AuthUser>(
      environment.urlServer + '/auth/register',
      newUser
    );
  }

  isLogin() {
    return this.jwt.getToken() ? true : false;
  }

  login(userLogin: LoginUserDTO) {
    return this.http.post<AuthUser>(
      environment.urlServer + '/signin',
      userLogin
    );
  }

  logout() {
    this.jwt.removeToken();
    this.router.navigate([APP_ROUTES.Public.Login]);
  }
}
