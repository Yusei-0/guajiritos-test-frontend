import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tm-update-task-dialog',
  standalone: true,
  imports: [],
  templateUrl: './update-task-dialog.component.html',
  styleUrl: './update-task-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateTaskDialogComponent {

}
