import { ContainerComponent } from '@/base';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
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
  FormGroup,
} from '@angular/forms';
import { merge } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { APP_ROUTES, LoginUserDTO } from '@/models';
import { AuthService, JwtService, UserService } from '@/services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    // Core
    ReactiveFormsModule,
    RouterModule,

    //Material
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,

    // Components
    ContainerComponent,
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

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
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
    console.log('Submit');

    if (!this.validateForm()) return;

    const userLoginData: LoginUserDTO = {
      password: this.formLogin.value.password || '',
      email: this.formLogin.value.email || '',
    };

    this.authService.login(userLoginData).subscribe((response) => {
      this.jwtService.setToken(response.token, response.refreshToken);
      this.userService.setAuthUser(response);

      // this.toastr.success('Login successfully!');
      this.router.navigate(['/']);
    });
  }
  initilizeForm() {
    this.formLogin = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
