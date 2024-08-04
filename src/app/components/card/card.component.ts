import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * Card component that displays content in a card layout.
 * Specifies the width of the card in rem units.
 * @example
 * <card [widthInRem]="25">
 *   <card-header>Title of the Card</card-header>
 *   <card-body>
 *     Card Content
 *   </card-body>
 *   <card-actions>
 *     Card Actions
 *   </card-actions>
 * </card>
 */
@Component({
  selector: 'card',
  standalone: true,
  imports: [NgStyle],
  styleUrls: ['./card.component.scss'],
  templateUrl: './card.component.html',
})
export class CardComponent {

  /**
   * Width of the card in rem units. Default value is 25.
   */
  @Input() widthInRem: number = 25;
}
