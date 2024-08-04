import { MESSAGES } from '@/models';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'tm-change-password-dialog',
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
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ChangePasswordDialogComponent>);
  readonly fb = inject(FormBuilder);

  APP_MESSAGES = MESSAGES;

  // form = this.fb.group(
  //   {
  //     oldPassword: ['', [Validators.required]],
  //     password: ['', [Validators.required, Validators.minLength(6)]],
  //     confirmPassword: [''],
  //   }
  //   // {
  //   //   validators: passwordConfirmationValidator('password', 'confirmPassword'),
  //   // }
  // );
  onSubmit() {
    // if (!this.checkFormValid()) return;
    // let resCloseUpdateDialog: CloseUpdateUserDialogData;
    // const userForSubmit: UpdateUserDto = {
    //   name: this.form.value.name!,
    //   email: this.form.value.email!,
    //   role: this.form.value.role!,
    // };
    // if (this.form.value.password) {
    //   userForSubmit.password = this.form.value.password;
    //   resCloseUpdateDialog = {
    //     ther_is_password: true,
    //     updated_user: userForSubmit,
    //   };
    // } else {
    //   resCloseUpdateDialog = {
    //     ther_is_password: false,
    //     updated_user: userForSubmit,
    //   };
    // }
    // this.dialogRef.close(resCloseUpdateDialog);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
