import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
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
    private modulesService: ModulesService
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

  deleteExercise(exercise: any) {
    alert(`Exercise with id ${exercise.id} was deleted`);
    console.log(exercise);
  }

}
