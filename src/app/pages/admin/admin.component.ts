import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppTitleComponent } from '@/components';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ADMIN_ROUTES } from './models/routes-admin.model';
import { AuthService } from '@/services';
import { JustForAdminDirective } from '@/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true,
  imports: [
    //core
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,

    //material
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,

    //components
    AppTitleComponent,

    //Others
    JustForAdminDirective,
  ],
})
export class AdminComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);

  adminRoutes = ADMIN_ROUTES;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout();
  }
}
