import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExerciseComponent } from 'src/app/components/exercise/exercise.component';
import { DialogService } from 'src/app/dialog.service';
import { Exercise } from 'src/app/models';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-admin-exercises',
  templateUrl: './admin-exercises.component.html',
  styleUrls: ['./admin-exercises.component.scss']
})
export class AdminExercisesComponent implements OnInit, OnDestroy {

  public moduleId!: string;
  public exercises!: any;
  public dataSource!: MatTableDataSource<Exercise>;
  public displayedColumns: string[] = ['name', 'delete'];

  private modulesSubscription!: Subscription;
  private modalSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private modulesService: ModulesService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.moduleId = params.get('id') || '5';
      this.fetchExercises();
    });
  }

  onCreate() {
    let dialogRef = this.dialog.open(ExerciseComponent, {
      autoFocus: true,
      disableClose: true,
      data: {
        moduleId: this.moduleId
      }
    });

    this.modalSubscription = dialogRef.afterClosed().subscribe(
      (data) => {
        this.fetchExercises();
      }
    );
  }

  onDelete(exercise_id: string) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this exercise?')
      .afterClosed().subscribe((response) => {
        if (response) {
          alert(`Exercise with id ${exercise_id} was deleted`);
        }
      });
  }

  ngOnDestroy(): void {
    this.modulesSubscription?.unsubscribe();
    this.modalSubscription?.unsubscribe();
  }

  private fetchExercises() {
    this.modulesSubscription = this.modulesService.getExercises(this.moduleId).subscribe(
      (data) => {
        this.exercises = data;
        this.dataSource = new MatTableDataSource<Exercise>(this.exercises);
        this.dataSource.paginator = this.paginator;
      }, (err) => {
        console.log(err);
        this.snackBar.open('Something went wrong. Look in the console for details.', '', {
          duration: 5000
        });
      }
    );
  }

}
