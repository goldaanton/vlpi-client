import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ExerciseComponent } from 'src/app/components/exercise/exercise.component';
import { DialogService } from 'src/app/dialog.service';
import { Exercise } from 'src/app/models';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-admin-exercises',
  templateUrl: './admin-exercises.component.html',
  styleUrls: ['./admin-exercises.component.scss']
})
export class AdminExercisesComponent implements OnInit {

  public id!: string | null;
  public exercises!: any;
  public dataSource!: MatTableDataSource<Exercise>;
  public displayedColumns: string[] = ['name', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private modulesService: ModulesService,
    private dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.exercises = this.modulesService.getExercises(this.id);
      this.dataSource = new MatTableDataSource<Exercise>(this.exercises)
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ExerciseComponent, dialogConfig);
  }

  onDelete(exercise_id: string) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this exercise?')
      .afterClosed().subscribe((response) => {
        if (response) {
          alert(`Exercise with id ${exercise_id} was deleted`);
        }
      });
  }

}
