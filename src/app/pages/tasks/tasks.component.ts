import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {

  public exerciseId!: string;
  public exerciseAnswerId!: string;

  public tasks!: any[];
  public task!: any;
  public activeTaskId!: number;

  public isLastTask: boolean = false;
  public answeredTasksIds: number[] = [];

  public answerBlocks: string[] = [];
  public userAnswerBlocks: string[] = [];
  public correctBlocks: string[] = [];

  private tasksSubscription!: Subscription;

  constructor(
    private modulesService: ModulesService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
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

    this.activatedRoute.queryParams.subscribe((params) => {
        this.exerciseAnswerId = params.exerciseAnswerId;
      }
    );
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

  public setTask(taskId: number) {
    this.task = this.tasks.find((task) => task.id == taskId);
    this.activeTaskId = this.task.id;
    this.answerBlocks = this.task.solutionBlocks.map((block: { text: any; }) => block.text );
    this.userAnswerBlocks = [];
  }

  public checkAnswer(answerBlocks: string[]) {
    let solutionBlockIds = answerBlocks.map((text) => {
      return this.task.solutionBlocks.find((block: { text: string }) => block.text == text ).id
    });

    this.modulesService.answerTask(
      {
        taskId: this.activeTaskId,
        exerciseAnswerId: this.exerciseAnswerId,
        solutionBlockIds: solutionBlockIds
      }
    ).subscribe(
      (data) => {
        if (data.score == 0) {
          this.snackBar.open('Your answer is incorrect :(', '', { duration: 3000 });
        } else {
          this.snackBar.open('Your answer is correct!', '', { duration: 3000 });
        }
      }, (err) => {
        console.log(err);
        this.snackBar.open('Something went wrong. Look in the console for details.', '' , {
          duration: 3000
        });
      }, () => {
        this.answeredTasksIds.push(this.activeTaskId);
      }
    );
  }

  public onNextTask(): void {
    let index = this.tasks.indexOf(this.task);
    if (this.tasks.length - index == 2) {
      this.isLastTask = true;
    }

    this.setTask(this.tasks[index + 1].id);
  }

  public onShowAnswer(): void {

  }

  public onFinishExercise(): void {
    this.dialogService.openConfirmDialog("Are you sure you want to finish this exercise?")
      .afterClosed().subscribe(
        (response) => {
          if (response) {
            this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
          }
        }
      )
  }

  public isTaskAnswered(): boolean {
    return this.answeredTasksIds.includes(this.activeTaskId);
  }

  ngOnDestroy(): void {
    this.tasksSubscription?.unsubscribe();
  }

}
