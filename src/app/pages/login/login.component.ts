import { ContainerComponent, TextComponent, TitleComponent } from '@/base';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES, LoginUserDTO } from '@/models';
import { AuthService, JwtService, UserService } from '@/services';
import { AppTitleComponent, WideButtonComponent } from '@/components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    // Core
    ReactiveFormsModule,
    RouterModule,
    NgOptimizedImage,

    //Material
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,

    // Components
    ContainerComponent,
    WideButtonComponent,
    TitleComponent,
    TextComponent,
    AppTitleComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  jwtService = inject(JwtService);
  userService = inject(UserService);

  formLogin = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  hidePassword = signal(true);

  showOrHidePassword(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.initilizeForm();
  }

  backHome() {
    this.router.navigate([APP_ROUTES.Public.Home]);
  }

  validateForm(): boolean {
    if (this.formLogin!.invalid) {
      console.log('Form invalid');

      return false;
    }

    return true;
  }

  login() {
    if (!this.validateForm()) return;

    const userLoginData: LoginUserDTO = {
      password: this.formLogin.value.password || '',
      email: this.formLogin.value.email || '',
    };

    this.authService.login(userLoginData).subscribe((response) => {
      this.jwtService.setToken(response.accessToken);
      this.userService.setAuthUser(response.user);

      // this.toastr.success('Login successfully!');
      if (this.authService.isLogin())
        this.router.navigate([APP_ROUTES.Private.Admin]);
    });
  }
  initilizeForm() {
    this.formLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
