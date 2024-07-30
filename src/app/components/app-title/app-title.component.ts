import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tm-app-title',
  standalone: true,
  imports: [],
  templateUrl: './app-title.component.html',
  styleUrl: './app-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTitleComponent {}
