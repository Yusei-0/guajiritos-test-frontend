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
import { AuthService, UserService } from '@/services';
import { JustForAdminDirective } from '@/core';
import { User, USER_DEFAULT } from '@/models';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from './components';

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
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {});
    // dialogRef.afterClosed().subscribe((res) => {
    //   console.log('close');
    // });
  }

  logout() {
    this.authService.logout();
  }
}
