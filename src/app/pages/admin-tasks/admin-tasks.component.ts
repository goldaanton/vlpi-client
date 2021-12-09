import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SolutionBlock } from 'src/app/models';
import { DialogService } from 'src/app/services/dialog.service';
import { ModulesService } from 'src/app/services/modules.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.scss']
})
export class AdminTasksComponent implements OnInit, OnDestroy {

  public exerciseId!: string;
  public isNewExercise: boolean = false;

  public tasks: any[] = [];

  public activeTask!: any;
  public activeTaskId!: number;

  public answerBlocks: string[] = [];
  public correctAnswerBlocks: string[] = [];

  public question!: string;
  public points: number = 100;

  public newBlockForm: FormGroup = new FormGroup({
    text: new FormControl('')
  });

  private tasksSubscription!: Subscription;

  constructor(
    private modulesService: ModulesService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private snackService: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      if (params.get('new')) {
        this.isNewExercise = true;
      }
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.exerciseId = params.get('id') || '1';
      this.fetchTasks(0);
    });
  }

  public setTask(taskId: number) {
    this.activeTask = this.tasks.find(task => task.id == taskId);
    this.activeTaskId = this.activeTask.id;
    this.answerBlocks = this.activeTask.solutionBlocks
      .map((block: SolutionBlock) => block.text );
    this.correctAnswerBlocks = [];
    this.question = this.activeTask.question;
    this.points = this.activeTask.score;

    this.modulesService.getTaskSolution(taskId.toString())
      .subscribe(
        (data) => {
          data.map((block: SolutionBlock) => {
            let index = this.answerBlocks.indexOf(block.text);
            if (index > -1) {
              this.answerBlocks.splice(index, 1);
              this.correctAnswerBlocks.push(block.text);
            }
          });
        }, (err) => {
          this.snackService.showError(err);
        }
      );
  }

  // * NOTE: creating task only on front end to fill data
  public onCreate() {
    let index = (Math.max.apply(null, this.tasks.map((task) => parseInt(task.id))) + 1);
    this.tasks.push({
      id: index,
      question: '',
      score: 0,
      solutionBlocks: []
    });
    this.setTask(index);
  }

  // * NOTE: actual crating task in databse
  public createTask(answerBlocksList: string[], correctAnswerList: string[]) {
    let solutionBlocks: any[] = [];

    answerBlocksList.forEach((text: string) => {
      solutionBlocks.push({ text: text });
    });

    correctAnswerList.forEach((text: string, i: number) => {
      solutionBlocks.push({
        text: text,
        solutionOrder: i
      });
    });

    this.modulesService.createTask(
      {
        question: this.question,
        score: this.points,
        exerciseId: this.exerciseId,
        solutionBlocks
      }
    ).subscribe(
      (data) => {
        this.snackService.showMessage('Task was created successfully!');
        this.fetchTasks(this.tasks.length - 1);
      }, (err) => {
        this.snackService.showError(err);
      }
    );
  }

  public onDelete(taskId: number) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this task?')
      .afterClosed().subscribe((response) => {
        if (response) {
          this.modulesService.deleteTask(taskId).subscribe(
            (data) => {
              this.snackService.showMessage('Task was deleted successfully.');
              this.fetchTasks(this.tasks.length - 2);
            }, (err) => {
              this.snackService.showError(err);
            }
          )
        }
      });
  }

  public addNewBlock() {
    if (this.newBlockForm.value.text) {
      this.answerBlocks.push(this.newBlockForm.value.text);
      this.newBlockForm.reset();
    }
  }

  public onArrowBack() {
    if (!this.isNewExercise) {
      this.router.navigate(['../../'], {
        relativeTo: this.activatedRoute
      });

      return;
    }

    this.dialogService
      .openConfirmDialog(
        'Do you want to finish creating tasks? You will no be able to update this exercise later!'
      ).afterClosed()
      .subscribe(
        (response) => {
          if (response) {
            this.router.navigate(['../../'], {
              relativeTo: this.activatedRoute
            });
            this.snackService.showMessage('Exercise was created!');
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
  }

  private fetchTasks(activeTaskId: number) {
    this.tasksSubscription = this.modulesService
      .getTasks(this.exerciseId)
      .subscribe(
        (data) => {
          this.tasks = data.tasks;
          this.setTask(this.tasks[activeTaskId].id);
        }, (err) => {
          this.snackService.showError(err);
        }
      );
  }

}
