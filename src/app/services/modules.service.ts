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
    return this.http.get(
      `${env.apiHostUrl}/module/all`
    )
  }

  public getExercises(moduleId: string): Observable<any> {
    return this.http.get(
      `${env.apiHostUrl}/exercise/all?moduleId=${moduleId}`
    );
  }

  public createExercise(exercise: Exercise): Observable<any> {
    let name = exercise.name;
    let description = exercise.description;
    let moduleId = exercise.moduleId;

    return this.http.post(
      `${env.apiHostUrl}/exercise`,
      {
        name,
        description,
        moduleId
      }
    );
  }

  public deleteExercise(exerciseId: string): Observable<any> {
    return this.http.delete(`${env.apiHostUrl}/exercise/${exerciseId}`);
  }

  public getTasks(exerciseId: string): Observable<any> {
    return this.http.get(`${env.apiHostUrl}/exercise/${exerciseId}`);
  }

  public createTask(task: any): Observable<any> {
    let question = task.question;
    let score = task.score;
    let exerciseId = task.exerciseId;
    let solutionBlocks = task.solutionBlocks;

    return this.http.post(
      `${env.apiHostUrl}/task`,
      {
        question,
        score,
        exerciseId,
        solutionBlocks
      }
    );
  }

  public startExercise(exerciseId: string): Observable<any> {
    return this.http.post(`${env.apiHostUrl}/exercise-answer`, {
      exerciseId
    });
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
