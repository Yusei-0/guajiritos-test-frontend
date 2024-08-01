import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CreateUserDTO, MESSAGES, RoleOptions, ROLES } from '@/models';
import { MatSelectModule } from '@angular/material/select';
import { passwordConfirmationValidator } from '@/helpers';

@Component({
  selector: 'tm-add-user-dialog',
  standalone: true,
  imports: [
    //core
    ReactiveFormsModule,

    //material
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddUserDialogComponent>);
  readonly fb = inject(FormBuilder);
  // readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model('dog');

  roles = ROLES;
  APP_MESSAGES = MESSAGES;

  form = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      role: [RoleOptions.USER, Validators.required],
    },
    { validators: passwordConfirmationValidator('password', 'confirmPassword') }
  );

  checkFormValid() {
    return this.form.valid;
  }

  onSubmit() {
    console.log('submit');

    if (!this.checkFormValid()) return;

    const userForSubmit: CreateUserDTO = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      password: this.form.value.password!,
      role: this.form.value.role!,
    };

    console.log('ClOse');

    this.dialogRef.close(userForSubmit);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
