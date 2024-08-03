import {
  NewTaskDto,
  Task,
  TaskStatusOptions,
  User,
  USER_DEFAULT,
} from '@/models';
import { TaskService, UserService } from '@/services';
import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import {
  DeleteDialogComponent,
  FloatAddButtonComponent,
} from '../../components';
import { AddTaskDialogComponent } from '../../components/add-task-dialog/add-task-dialog.component';
import { CloseCreateTaskDialogModel } from '../../models/create-task-dialog-model';
import { title } from 'process';
import { TaskForUserAdapter } from '@/adapters';

@Component({
  selector: 'tm-tasks-list',
  standalone: true,
  imports: [
    //core
    JsonPipe,

    //material
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,

    //components
    FloatAddButtonComponent,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  taskService = inject(TaskService);
  dialog = inject(MatDialog);
  taskSuscription!: Subscription;
  userService = inject(UserService);
  userSuscription!: Subscription;
  currentUser: User = USER_DEFAULT;
  data = signal<any>([]);
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'status',
    'actions',
  ];
  taskDataSource = signal<MatTableDataSource<Task>>(new MatTableDataSource());
  ngOnInit(): void {
    this.userSuscription = this.userService.user$.subscribe((data) => {
      this.currentUser = data;
      this.getTaskData();
    });
  }
  getTaskData() {
    this.taskSuscription = this.taskService.getAllTasks().subscribe((tasks) => {
      tasks = TaskForUserAdapter(tasks, this.currentUser);

      this.data.set(tasks);
      this.taskDataSource.set(new MatTableDataSource(tasks));
      this.taskDataSource.update((x) => {
        x.paginator = this.paginator;
        return x;
      });
      this.taskDataSource.update((x) => {
        x.sort = this.sort;
        return x;
      });
    });
  }
  deleteTask(task: Task) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: task.title,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === true)
        this.taskService.deleteTask(task.id).subscribe((res) => {
          console.log('res delete:', res);
          this.getTaskData();
        });
    });
  }
  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {});
    dialogRef.afterClosed().subscribe((result: CloseCreateTaskDialogModel) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        const newTask: NewTaskDto = {
          ...result,
          status: TaskStatusOptions.TODO,
          userId:
            this.currentUser.role === 'user'
              ? this.currentUser.id
              : result.userId
              ? result.userId
              : -1,
        };

        this.taskService.createNewTask(newTask).subscribe((task) => {
          this.getTaskData();
        });
      }
    });
  }
  // openUpdateUserDialog(user: User): void {
  //   const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
  //     data: {
  //       user,
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: CloseUpdateUserDialogData) => {
  //     if (result !== undefined) {
  //       let userForUpdate: UpdateUserDto;
  //       const { ther_is_password, updated_user } = result;
  //       userForUpdate = {
  //         name: updated_user.name,
  //         email: updated_user.email,
  //         role: updated_user.role,
  //       };
  //       if (ther_is_password && updated_user.password) {
  //         this.userService.deleteUser(user.id).subscribe(() => {
  //           this.userService.createNewUser({
  //             ...userForUpdate,
  //             password: updated_user.password!,
  //           });
  //         });
  //       } else
  //         this.userService
  //           .updateUser(userForUpdate, user.id)
  //           .subscribe((userRes) => {
  //             this.getUserData();
  //           });
  //     }
  //   });
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.taskDataSource().filter = filterValue.trim().toLowerCase();
    if (this.taskDataSource().paginator) {
      this.taskDataSource().paginator!.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
    this.taskSuscription.unsubscribe();
  }
}
