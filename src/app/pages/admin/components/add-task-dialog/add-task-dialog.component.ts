import { MESSAGES, Role, RoleOptions, TASK_STATUSES, User } from '@/models';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
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
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {
  CloseCreateTaskDialogModel,
  CreateTaskDialogModel,
} from '../../models/create-task-dialog-model';
import { NotificationsService, UserService } from '@/services';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tm-add-task-dialog',
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
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskDialogComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  readonly dialogRef = inject(MatDialogRef<AddTaskDialogComponent>);
  readonly fb = inject(FormBuilder);
  readonly userService = inject(UserService);
  readonly notify = inject(NotificationsService);
  readonly data = inject<CreateTaskDialogModel>(MAT_DIALOG_DATA);

  userSubscription!: Subscription;
  taskStatus = TASK_STATUSES;
  APP_MESSAGES = MESSAGES;
  users = signal<User[]>([]);
  filteredUsers: User[] = [];

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    userId: [],
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

    const newTask: CloseCreateTaskDialogModel = {
      title: this.form.value.title!,
      description: this.form.value.description!,
    };

    if (this.userRole === RoleOptions.ADMIN && !this.form.value.userId) {
      this.notify.openSimpleSnackBar('Miss selected user');
      return;
    }
    if (this.userRole === 'admin')
      newTask.userId = this.form.value.userId ? this.form.value.userId : -2;

    this.dialogRef.close(newTask);
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
