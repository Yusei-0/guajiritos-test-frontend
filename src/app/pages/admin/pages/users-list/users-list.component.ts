import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tm-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {

}