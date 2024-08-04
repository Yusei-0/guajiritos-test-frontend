import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MESSAGES } from '@/models';
import { passwordConfirmationValidator } from '@/helpers';

export interface ResCloseChangePassword {
  oldPassword: string;
  newPassword: string;
}

@Component({
  selector: 'tm-change-password',
  standalone: true,
  imports: [
    //core
    ReactiveFormsModule,
    FormsModule,

    //material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  readonly dialogRef = inject(MatDialogRef<ChangePasswordDialogComponent>);
  readonly fb = inject(FormBuilder);

  APP_MESSAGES = MESSAGES;

  form = this.fb.group(
    {
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    },
    {
      validators: passwordConfirmationValidator('password', 'confirmPassword'),
    }
  );

  onSubmit() {
    if (!this.form.valid) return;

    const resCloseChangePassword: ResCloseChangePassword = {
      oldPassword: this.form.value.oldPassword!,
      newPassword: this.form.value.password!,
    };

    this.dialogRef.close(resCloseChangePassword);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
