import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogService } from 'src/app/dialog.service';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.scss']
})
export class AdminTasksComponent implements OnInit {

  public tasks!: any[];
  public task!: any;
  public activeTaskId!: string;

  public answerBlocks: string[] = [];
  public correctAnswerBlocks: string[] = [];

  public question!: string;
  public points: number = 3;

  newBlockForm: FormGroup = new FormGroup({
    text: new FormControl('', Validators.required),
  })

  constructor(
    private modulesService: ModulesService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.tasks = this.modulesService.getTasks(1);
    this.setTask(this.tasks[0].id);
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
    this.answerBlocks = this.task.solution_blocks.map((block: { text: any; }) => block.text );
    this.correctAnswerBlocks = [];
  }

  public createTask(answerBlocksList: string[], correctAnswerList: string[]) {
    console.log(this.question);
    console.log(this.points);
    console.log(answerBlocksList);
    console.log(correctAnswerList);
  }

  public onCreate() {
    let index = (Math.max.apply(null, this.tasks.map((task) => parseInt(task.id))) + 1).toString();
    this.tasks.push({
      id: index,
      question: '',
      score: 0,
      solution_blocks: []
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

  addNewBlock() {
    if (this.newBlockForm.valid) {
      this.answerBlocks.push(this.newBlockForm.value.text);
      this.newBlockForm.reset();
    }
  }

}
