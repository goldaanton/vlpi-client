import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExerciseComponent } from 'src/app/components/exercise/exercise.component';
import { Exercise } from 'src/app/models';
import { DialogService } from 'src/app/services/dialog.service';
import { ModulesService } from 'src/app/services/modules.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-admin-exercises',
  templateUrl: './admin-exercises.component.html',
  styleUrls: ['./admin-exercises.component.scss']
})
export class AdminExercisesComponent implements OnInit, OnDestroy {

  public moduleId!: string;

  public dataSource: MatTableDataSource<Exercise> = new MatTableDataSource<Exercise>();

  public displayedColumns: string[] = ['name', 'delete'];

  private modulesSubscription!: Subscription;
  private modalSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private modulesService: ModulesService,
    private dialogService: DialogService,
    private snackService: SnackBarService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.moduleId = params.get('id') || '5';
      this.fetchExercises();
    });
  }

  public onCreate() {
    let dialogRef = this.dialog.open(ExerciseComponent, {
      autoFocus: true,
      disableClose: true,
      data: { moduleId: this.moduleId }
    });

    this.modalSubscription = dialogRef.afterClosed()
      .subscribe(
        (data) => {
          this.fetchExercises();
        }
      );
  }

  public onDelete(exerciseId: string) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this exercise?')
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.modulesService.deleteExercise(exerciseId).subscribe(
            (data) => {
              this.snackService.showMessage('Exercise was deleted.');
              this.fetchExercises();
            }, (err) => {
              this.snackService.showError(err);
            }
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.modulesSubscription?.unsubscribe();
    this.modalSubscription?.unsubscribe();
  }

  private fetchExercises() {
    this.modulesSubscription = this.modulesService
      .getExercises(this.moduleId)
      .subscribe(
        (data) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
        }, (err) => {
          this.snackService.showError(err);
        }
      );
  }

}
