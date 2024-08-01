import { passwordConfirmationValidator } from '@/helpers';
import { CreateUserDTO, MESSAGES, RoleOptions, ROLES, User } from '@/models';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface UpdateUserDialogData {
  user: User;
}

export interface CloseUpdateUserDialogData {
  ther_is_password: boolean;
  updated_user: CreateUserDTO;
}

@Component({
  selector: 'tm-update-user-dialog',
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
  templateUrl: './update-user-dialog.component.html',
  styleUrl: './update-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UpdateUserDialogComponent>);
  readonly fb = inject(FormBuilder);
  readonly data = inject<UpdateUserDialogData>(MAT_DIALOG_DATA);

  roles = ROLES;
  APP_MESSAGES = MESSAGES;

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: [this.data.user.name, Validators.required],
        email: [this.data.user.email, [Validators.required, Validators.email]],
        password: [''],
        confirmPassword: [''],
        role: [this.data.user.role, Validators.required],
      },
      {
        validators: passwordConfirmationValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

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

    console.log('CLOse');

    this.dialogRef.close(userForSubmit);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
