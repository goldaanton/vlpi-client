import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModulesService } from 'src/app/services/modules.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(
    private modulesService: ModulesService,
    private dialogRef: MatDialogRef<ExerciseComponent>,
    private snackService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.form.valid) {
      this.modulesService.createExercise(
        {
          name: this.form.value.name,
          description: this.form.value.description,
          moduleId: this.data.moduleId
        }
      ).subscribe(
        (data) => {
          this.dialogRef.close(data.id);
        }, (err) => {
          this.snackService.showError(err);
          this.dialogRef.close(false);
        }
      );
    }
  }

  onReset() {
    this.form.reset();
  }

  onClose() {
    this.dialogRef.close(false);
  }

}
