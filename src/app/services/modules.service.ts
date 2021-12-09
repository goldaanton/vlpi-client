import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { Exercise } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(
    private http: HttpClient
  ) { }

  public getModules(): Observable<any> {
    return this.http.get(`${env.apiHostUrl}/module/all`);
  }

  public getExercises(moduleId: string): Observable<any> {
    return this.http.get(`${env.apiHostUrl}/exercise/all?moduleId=${moduleId}`);
  }

  public createExercise(exercise: Exercise): Observable<any> {
    return this.http.post(
      `${env.apiHostUrl}/exercise`,
      {
        name: exercise.name,
        description: exercise.description,
        moduleId: exercise.moduleId
      }
    );
  }

  public deleteExercise(exerciseId: string): Observable<any> {
    return this.http.delete(`${env.apiHostUrl}/exercise/${exerciseId}`);
  }

  public getTasks(exerciseId: string): Observable<any> {
    return this.http.get(`${env.apiHostUrl}/exercise/${exerciseId}`);
  }

  public getTaskSolution(taskId: string): Observable<any> {
    return this.http.get(`${env.apiHostUrl}/task/${taskId}/solution`);
  }

  public createTask(task: any): Observable<any> {
    return this.http.post(
      `${env.apiHostUrl}/task`,
      {
        question: task.question,
        score: task.score,
        exerciseId: task.exerciseId,
        solutionBlocks: task.solutionBlocks
      }
    );
  }

  public startExercise(exerciseId: string): Observable<any> {
    return this.http.post(
      `${env.apiHostUrl}/exercise-answer`,
      {
        exerciseId
      }
    );
  }

  public answerTask(answerParams: any): Observable<any> {
    return this.http.post(
      `${env.apiHostUrl}/task-answer`,
      {
        taskId: answerParams.taskId,
        exerciseAnswerId: answerParams.exerciseAnswerId,
        solutionBlockIds: answerParams.solutionBlockIds
      }
    );
  }

}
