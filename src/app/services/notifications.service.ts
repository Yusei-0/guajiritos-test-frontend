import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  snackBar = inject(MatSnackBar);

  openSimpleSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
