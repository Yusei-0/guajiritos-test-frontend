import { passwordConfirmationValidator } from '@/helpers';
import { CreateUserDTO, MESSAGES, ROLES, UpdateUserDto } from '@/models';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
import {
  CloseUpdateUserDialogData,
  UpdateUserDialogData,
} from '../../models/update-user-dialog.model';

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
    if (!this.checkFormValid()) return;

    let resCloseUpdateDialog: CloseUpdateUserDialogData;

    const userForSubmit: UpdateUserDto = {
      name: this.form.value.name!,
      email: this.form.value.email!,
      role: this.form.value.role!,
    };

    if (this.form.value.password) {
      userForSubmit.password = this.form.value.password;

      resCloseUpdateDialog = {
        ther_is_password: true,
        updated_user: userForSubmit,
      };
    } else {
      resCloseUpdateDialog = {
        ther_is_password: false,
        updated_user: userForSubmit,
      };
    }

    this.dialogRef.close(resCloseUpdateDialog);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
