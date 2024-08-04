import { CreateUserDTO, User } from '@/models';
import { NotificationsService, UserService } from '@/services';
import { JsonPipe } from '@angular/common';
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
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  AddUserDialogComponent,
  DeleteDialogComponent,
  FloatAddButtonComponent,
  UpdateUserDialogComponent,
} from '../../components/';
import { CloseUpdateUserDialogData } from '../../models/update-user-dialog.model';
import { UpdateUserDto } from '../../../../models/dto/user.dto';

@Component({
  selector: 'tm-users-list',
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
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userService = inject(UserService);
  dialog = inject(MatDialog);
  notify = inject(NotificationsService);

  userSuscription!: Subscription;

  data = signal<any>([]);
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  usersDataSource = signal<MatTableDataSource<User>>(new MatTableDataSource());

  ngOnInit(): void {
    this.getUserData();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
  }

  getUserData() {
    this.userSuscription = this.userService.getAllUsers().subscribe((users) => {
      this.data.set(users);
      this.usersDataSource.set(new MatTableDataSource(users));
      this.usersDataSource.update((x) => {
        x.paginator = this.paginator;
        return x;
      });

      this.usersDataSource.update((x) => {
        x.sort = this.sort;
        return x;
      });
    });
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: user.name,
        title: 'User',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res === true)
        this.userService.deleteUser(user.id).subscribe((res) => {
          console.log('res delete:', res);
          this.getUserData();
        });
    });
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: CreateUserDTO) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.userService.createNewUser(result).subscribe((user) => {
          this.getUserData();
        });
      }
    });
  }
  openUpdateUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      data: {
        user,
      },
    });

    dialogRef.afterClosed().subscribe((result: CloseUpdateUserDialogData) => {
      if (result !== undefined) {
        let userForUpdate: UpdateUserDto;
        const { ther_is_password, updated_user } = result;

        userForUpdate = {
          name: updated_user.name,
          email: updated_user.email,
          role: updated_user.role,
        };

        this.userService
          .updateUser(userForUpdate, user.id)
          .subscribe((data) => {
            console.log(data);

            if (ther_is_password && updated_user.password) {
              this.userService
                .updatePassword(updated_user.password, user.id)
                .subscribe((res) => {
                  console.log(res);
                  this.getUserData();
                  this.notify.openSimpleSnackBar(
                    'Password changed successfully'
                  );
                });
            } else this.getUserData();
          });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource().filter = filterValue.trim().toLowerCase();

    if (this.usersDataSource().paginator) {
      this.usersDataSource().paginator!.firstPage();
    }
  }
}
