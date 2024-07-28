import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { JwtService } from './jwt.service';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthUser, CreateUserDto, LoginUserDTO } from '@/models/dto';
import { TokensAuthDto } from '@/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  jwt = inject(JwtService);
  router = inject(Router);

  constructor() {}

  register(newUser: CreateUserDto) {
    console.log(newUser);
    return this.http
      .post<AuthUser>(environment.urlServer + '/auth/register', newUser)
      .pipe(retry(3));
    // .subscribe((res) => {
    //   const { token }: any = res;
    //   this.jwt.setToken(token);
    // },(error:any)=>{
    //   console.log(error);
    // });
  }

  isLogin() {
    return this.jwt.getToken() ? true : false;
  }

  login(userLogin: LoginUserDTO) {
    return this.http
      .post<AuthUser>(environment.urlServer + '/auth/login', userLogin)
      .pipe(retry(3));
  }

  logout() {
    this.jwt.removeToken();
    this.router.navigate(['/login']);
  }

  refreshToken() {
    const refreshToken = this.jwt.getRefreshToken();
    return this.http.post<TokensAuthDto>(
      environment.urlServer + '/auth/refresh',
      { refreshToken }
    );
  }
}
