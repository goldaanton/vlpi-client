import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModulesService } from 'src/app/services/modules.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  private modulesSubscription!: Subscription;

  constructor(
    private modulesService: ModulesService,
    private dialogRef: MatDialogRef<ExerciseComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.modulesSubscription = this.modulesService.createExercise(
        {
          name: this.form.value.name,
          description: this.form.value.description,
          moduleId: this.data.moduleId
        }
      ).subscribe(
        (data) => {
          this.snackBar.open('Exercise was created successfully!', '', {
            duration: 3000
          });
        }, (err) => {
          console.log(err);
          this.snackBar.open('Something went wrong. Look in the console for details.', '', {
            duration: 5000
          });
        }
      );

      this.onClose();
    }
  }

  onReset() {
    this.form.reset();
  }

  onClose() {
    this.form.reset();
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.modulesSubscription?.unsubscribe();
  }

}
