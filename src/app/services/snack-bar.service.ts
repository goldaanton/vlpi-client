import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public showError(err: any) {
    console.log(err);

    this.snackBar.open(
      'Something went wrong. Look in the console for details.',
      '' ,
      { duration: 3000 }
    );
  }

  public showMessage(message: string) {
    this.snackBar.open(
      message,
      'OK' ,
      {
        duration: 5000,
        panelClass: 'snackbar'
      }
    );
  }
}
