import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'wide-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './wide-button.component.html',
  styleUrl: './wide-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WideButtonComponent {}
