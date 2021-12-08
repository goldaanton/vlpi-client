import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.scss']
})
export class AdminTasksComponent implements OnInit, OnDestroy {

  public exerciseId!: string;
  public tasks!: any[];
  public task!: any;
  public activeTaskId!: string;

  public answerBlocks: string[] = [];
  public correctAnswerBlocks: string[] = [];

  public question!: string;
  public points: number = 3;

  private tasksSubscription: Subscription | undefined;

  newBlockForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
  })

  constructor(
    private modulesService: ModulesService,
    private dialogService: DialogService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.exerciseId = params.get('id') || '1';
      this.fetchTasks(0);
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
    this.correctAnswerBlocks = [];
  }

  public createTask(answerBlocksList: string[], correctAnswerList: string[]) {
    let question = this.question;
    let score = this.points;
    let exerciseId = this.exerciseId;
    let solutionBlocks: any[] = [];

    answerBlocksList.forEach((text: string) => {
      solutionBlocks.push({
        text: text
      });
    });

    correctAnswerList.forEach((text: string, i: number) => {
      solutionBlocks.push({
        text: text,
        solutionOrder: i
      });
    });

    this.modulesService.createTask(
      {
        question,
        score,
        exerciseId,
        solutionBlocks
      }
    ).subscribe(
      (data) => {
        this.snackBar.open('Task was created successfully!', '', {
          duration: 3000
        });
        this.fetchTasks(this.tasks.length - 1);
      }, (err) => {
        console.log(err);
        this.snackBar.open('Something went wrong. Look in the console for details.', '' , {
          duration: 3000
        });
      }
    );
  }

  public onCreate() {
    let index = (Math.max.apply(null, this.tasks.map((task) => parseInt(task.id))) + 1).toString();
    this.tasks.push({
      id: index,
      question: '',
      score: 0,
      solutionBlocks: []
    });
    this.setTask(index);
  }

  public onDelete(exercise_id: string) {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this task?')
      .afterClosed().subscribe((response) => {
        if (response) {
          alert(`Exercise with id ${exercise_id} was deleted`);
        }
      });
  }

  public addNewBlock() {
    if (this.newBlockForm.valid) {
      this.answerBlocks.push(this.newBlockForm.value.text);
      this.newBlockForm.reset();
    }
  }

  private fetchTasks(activeTaskId: number) {
    this.tasksSubscription = this.modulesService.getTasks(this.exerciseId).subscribe(
      (data) => {
        this.tasks = data.tasks;
        console.log(this.tasks);
        console.log(activeTaskId);
        this.setTask(this.tasks[activeTaskId].id);
      }, (err) => {
        console.log(err);
        this.snackBar.open('Something went wrong. Look in the console for details.', '' , {
          duration: 3000
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.tasksSubscription?.unsubscribe();
  }

}
