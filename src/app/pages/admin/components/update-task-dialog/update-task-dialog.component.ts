import { MESSAGES, Role, RoleOptions, TASK_STATUSES, User } from '@/models';
import { NotificationsService, UserService } from '@/services';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {
  CloseUpdateTaskDialogModel,
  UpdateTaskDialogModel,
} from '../../models';
import { Subject, Subscription, takeUntil } from 'rxjs';

export interface TaskDialogForm {
  title: FormControl<string>;
  description: FormControl<string>;
  userId?: FormControl<number>;
}
interface TaskForm {
  title: string;
  description: string;
  userId: number | null;
}

@Component({
  selector: 'tm-update-task-dialog',
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
    NgxMatSelectSearchModule,
  ],
  templateUrl: './update-task-dialog.component.html',
  styleUrl: './update-task-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UpdateTaskDialogComponent>);
  readonly fb = inject(FormBuilder);
  readonly userService = inject(UserService);
  readonly notify = inject(NotificationsService);
  readonly data = inject<UpdateTaskDialogModel>(MAT_DIALOG_DATA);

  userSubscription!: Subscription;
  taskStatus = TASK_STATUSES;
  APP_MESSAGES = MESSAGES;
  users = signal<User[]>([]);
  filteredUsers: User[] = [];

  form = this.fb.group({
    title: [this.data.taskToUpdate.title, Validators.required],
    description: [this.data.taskToUpdate.description, Validators.required],
    userId: [this.data.taskToUpdate.userId || null],
  });

  public userFilterCtrl: FormControl<string | null> = new FormControl<string>(
    ''
  );

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  protected _onDestroy = new Subject<void>();

  userRole!: Role;

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();

    console.log('User role:', this.userRole);

    if (this.userRole === RoleOptions.ADMIN) {
      this.users.set(this.data.users);

      this.filteredUsers = this.users().slice();

      this.userFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterUsers();
        });
    }
  }

  ngAfterViewInit(): void {
    this.setInitialValue();
  }

  checkFormValid() {
    return this.form.valid;
  }

  onSubmit() {
    if (!this.checkFormValid()) return;

    const updatedTask: CloseUpdateTaskDialogModel = {
      title: this.form.value.title!,
      description: this.form.value.description!,
    };

    if (this.userRole === RoleOptions.ADMIN && !this.form.value.userId) {
      this.notify.openSimpleSnackBar('Miss selected user');
      return;
    }
    if (this.userRole === 'admin')
      updatedTask.userId = this.form.value.userId ? this.form.value.userId : -2;

    this.dialogRef.close(updatedTask);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  protected setInitialValue() {
    this.filteredUsers = this.users().slice();
  }

  protected filterUsers() {
    if (!this.users) {
      return;
    }

    let search = this.userFilterCtrl.value;
    if (!search) {
      this.filteredUsers = this.users().slice();
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredUsers = this.users().filter((user) =>
      user.name.toLowerCase().includes(search)
    );
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
