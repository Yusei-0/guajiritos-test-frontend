import { CardComponent } from '@/components';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'tm-not-found',
  standalone: true,
  imports: [CardComponent, MatButtonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  router = inject(Router);

  onBack(): void {
    this.router.navigate(['/admin']);
  }
}
