import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {

  public exerciseId!: string;

  public tasks!: any[];
  public task!: any;
  public activeTaskId!: string;

  public answerBlocks: string[] = [];
  public userAnswerBlocks: string[] = [];

  private tasksSubscription!: Subscription;

  constructor(
    private modulesService: ModulesService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.exerciseId = params.get('id') || '1';
      this.tasksSubscription = this.modulesService.getTasks(this.exerciseId).subscribe(
        (data) => {
          this.tasks = data.tasks;
          this.setTask(this.tasks[0].id);
        }, (err) => {
          console.log(err);
          this.snackBar.open('Something went wrong. Look in the console for details.', '' , {
            duration: 3000
          });
        }
      );
    });
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  public setTask(taskId: string) {
    this.task = this.tasks.find(task => task.id == taskId);
    this.activeTaskId = this.task.id;
    this.answerBlocks = this.task.solutionBlocks.map((block: { text: any; }) => block.text );
    this.userAnswerBlocks = [];
  }

  public checkAnswer(answerBlocks: string[]) {
    alert(answerBlocks.join(' '));
  }

  ngOnDestroy(): void {
    this.tasksSubscription?.unsubscribe();
  }

}
