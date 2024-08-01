import { CreateUserDTO, User } from '@/models';
import { UserService } from '@/services';
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
  CloseUpdateUserDialogData,
  DeleteDialogComponent,
  FloatAddButtonComponent,
  UpdateUserDialogComponent,
} from '../../components/';

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

  userSuscription!: Subscription;

  data = signal<any>([]);
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  usersDataSource = signal<MatTableDataSource<User>>(new MatTableDataSource());

  ngOnInit(): void {
    this.getUserData();
  }

  ngAfterViewInit(): void {
    this.usersDataSource().paginator = this.paginator;
    this.usersDataSource().sort = this.sort;
  }

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
  }

  getUserData() {
    this.userSuscription = this.userService.getAllUsers().subscribe((users) => {
      this.data.set(users);
      this.usersDataSource.set(new MatTableDataSource(users));
    });
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        name: user.name,
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
      console.log('The dialog was closed');
      // if (result !== undefined) {
      //   // this.userService.createNewUser(result).subscribe((user) => {
      //   //   this.getUserData();
      //   // });
      // }
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
