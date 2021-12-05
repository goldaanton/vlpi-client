import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModulesService } from 'src/app/services/modules.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(
    private moduleService: ModulesService,
    private dialogRef: MatDialogRef<ExerciseComponent>
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
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

}
