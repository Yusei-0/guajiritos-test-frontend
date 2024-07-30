import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type TextType =
  | 'default'
  | 'caption'
  | 'label'
  | 'hint'
  | 'error'
  | 'warning'
  | 'info'
  | 'title';

@Component({
  selector: 'tm-text',
  standalone: true,
  imports: [NgClass],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {
  type = input<TextType>('default');
}
