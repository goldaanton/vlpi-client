import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SolutionBlock } from 'src/app/models';
import { DialogService } from 'src/app/services/dialog.service';
import { ModulesService } from 'src/app/services/modules.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

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
  public isTaskAnswered: boolean = false;;
  public isShowSolutionPressed: boolean = false;
  public isAnswerCorrect: boolean = false;

  public answerBlocks: string[] = [];
  public userAnswerBlocks: string[] = [];
  public correctBlocks: string[] = [];

  private tasksSubscription!: Subscription;
  private solutionSunscription!: Subscription;
  private asnwerSunscription!: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modulesService: ModulesService,
    private snackService: SnackBarService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.exerciseId = params.get('id') || '1';

      this.tasksSubscription = this.modulesService
        .getTasks(this.exerciseId)
        .subscribe(
          (data) => {
            this.tasks = data.tasks;
            this.setTask(this.tasks[0].id);
          }, (err) => {
            this.snackService.showError(err);
          }
        );
    });

    this.activatedRoute.queryParams.subscribe((params) => {
        this.exerciseAnswerId = params.exerciseAnswerId;
      }
    );
  }

  public setTask(taskId: number) {
    this.task = this.tasks.find((task) => task.id == taskId);
    this.activeTaskId = this.task.id;
    this.answerBlocks = this.task.solutionBlocks.map((block: SolutionBlock) => block.text );
    this.userAnswerBlocks = [];
    this.correctBlocks = [];
    this.isTaskAnswered = false;
    this.isShowSolutionPressed = false;
    this.isAnswerCorrect = false;
  }

  public checkAnswer(answerBlocks: string[]) {
    let solutionBlockIds = answerBlocks.map((text) => {
      return this.task.solutionBlocks
        .find((block: SolutionBlock) => block.text == text ).id;
    });

    this.asnwerSunscription = this.modulesService.answerTask(
      {
        taskId: this.activeTaskId,
        exerciseAnswerId: this.exerciseAnswerId,
        solutionBlockIds: solutionBlockIds
      }
    ).subscribe(
      (data) => {
        let message = '';
        if (data.score == 0) {
          message = 'Your answer is incorrect :(';
        } else {
          this.isAnswerCorrect = true;
          message = 'Your answer is correct!';
        }
        this.snackService.showMessage(message);
      }, (err) => {
        this.snackService.showError(err);
      }, () => {
        this.isTaskAnswered = true;
      }
    );
  }

  public onNextTask(): void {
    let index = this.tasks.indexOf(this.task);

    if (this.tasks.length - index == 2) this.isLastTask = true;

    this.setTask(this.tasks[index + 1].id);
  }

  public onShowAnswer(): void {
    this.solutionSunscription = this.modulesService
      .getTaskSolution(this.activeTaskId.toString())
      .subscribe(
        (data) => {
          this.correctBlocks = data.map((block: SolutionBlock) => block.text);
          this.isShowSolutionPressed = true;
        }, (err) => {
          this.snackService.showError(err);
        }
      );
  }

  public onFinishExercise(): void {
    this.dialogService.openConfirmDialog("Are you sure you want to finish this exercise?")
      .afterClosed()
      .subscribe(
        (response) => {
          if (response) {
            this.router.navigate(
              ['../../'],
              { relativeTo: this.activatedRoute }
            );
          }
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

  ngOnDestroy(): void {
    this.tasksSubscription?.unsubscribe();
    this.solutionSunscription?.unsubscribe();
    this.asnwerSunscription?.unsubscribe();
  }

}
