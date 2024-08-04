import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppTitleComponent } from '@/components';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ADMIN_ROUTES } from './models/routes-admin.model';
import { AuthService, NotificationsService, UserService } from '@/services';
import { JustForAdminDirective } from '@/core';
import { User, USER_DEFAULT } from '@/models';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  ChangePasswordComponent,
  ChangePasswordDialogComponent,
  ResCloseChangePassword,
} from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true,
  imports: [
    //core
    AsyncPipe,
    UpperCasePipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,

    //material
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,

    //components
    AppTitleComponent,

    //Others
    JustForAdminDirective,
  ],
})
export class AdminComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private notify = inject(NotificationsService);

  userSuscription!: Subscription;

  currentUser: User = USER_DEFAULT;
  adminRoutes = ADMIN_ROUTES;
  drawer: any;

  ngOnInit(): void {
    this.userSuscription = this.userService.user$.subscribe(
      (user) => (this.currentUser = user)
    );
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {});

    dialogRef.afterClosed().subscribe((res: ResCloseChangePassword) => {
      const { newPassword, oldPassword } = res;
      this.userService
        .changePassworForUser(this.currentUser.id, oldPassword, newPassword)
        .subscribe((message) => {
          console.log(message);
          this.notify.openSimpleSnackBar('Password updated successfully');
        });
    });
  }

  logout() {
    this.authService.logout();
  }
}
