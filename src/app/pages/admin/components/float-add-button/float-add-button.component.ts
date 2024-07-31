import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tm-float-add-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './float-add-button.component.html',
  styleUrl: './float-add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatAddButtonComponent {}
