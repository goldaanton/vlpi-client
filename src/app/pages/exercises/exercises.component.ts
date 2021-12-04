import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ModulesService } from 'src/app/services/modules.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit, AfterViewInit {

  public id!: string | null;
  public exercises!: any;
  public dataSource!: MatTableDataSource<Exercise>;
  public displayedColumns: string[] = ['name'];

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;

  constructor(
    private route: ActivatedRoute,
    private modulesService: ModulesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.exercises = this.modulesService.getExercises(this.id);
      console.log(this.exercises);
      this.dataSource = new MatTableDataSource<Exercise>(this.exercises)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface Exercise {
  name: string;
}
