import { User } from '@/models';
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
import { FloatAddButtonComponent } from '../../components';

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
  editUser(_t70: any) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userService = inject(UserService);

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersDataSource().filter = filterValue.trim().toLowerCase();

    if (this.usersDataSource().paginator) {
      this.usersDataSource().paginator!.firstPage();
    }
  }
}
