import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type TextType =
  | 'default'
  | 'caption'
  | 'label'
  | 'hint'
  | 'error'
  | 'warning'
  | 'info';

@Component({
  selector: 'app-text',
  standalone: true,
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {
  type = input();
}
