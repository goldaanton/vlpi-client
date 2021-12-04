import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  public tasks!: any[];
  public task!: any;
  public activeTaskId!: string;

  public answerBlocks: string[] = [];
  public userAnswerBlocks: string[] = [];

  constructor(
    private modulesService: ModulesService
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
    this.userAnswerBlocks = [];
  }

  public checkAnswer(answerBlocks: string[]) {
    alert(answerBlocks.join(' '));
  }

}
