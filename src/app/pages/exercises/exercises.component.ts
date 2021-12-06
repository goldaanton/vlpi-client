import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ModulesService } from 'src/app/services/modules.service';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/models';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit, OnDestroy {

  public id!: string;
  public exercises!: any;
  public dataSource!: MatTableDataSource<Exercise>;
  public displayedColumns: string[] = ['name'];

  private modulesSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;

  constructor(
    private route: ActivatedRoute,
    private modulesService: ModulesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '5';
      this.modulesSubscription = this.modulesService.getExercises(this.id).subscribe(
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
    });
  }

  ngOnDestroy(): void {
    this.modulesSubscription?.unsubscribe()
  }

}
