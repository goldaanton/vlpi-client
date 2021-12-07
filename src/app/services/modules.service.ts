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

  public getTasks(exerciseId: any): any {
    return [
      {
        id: 1,
        question: 'Question 1',
        score: 5,
        solution_blocks: [
          {
            text: 'abcdefg',
            display_order: 1,
            solution_order: 1
          }
        ]
      },
      {
        id: 2,
        question: 'Question 2',
        score: 5,
        solution_blocks: [
          {
            text: 'abcdefg',
            display_order: 2,
            solution_order: 2
          }
        ]
      },
      {
        id: 3,
        question: 'Question 3',
        score: 5,
        solution_blocks: [
          {
            text: 'abcdefg',
            display_order: 3,
            solution_order: 3
          }
        ]
      },
      {
        id: 4,
        question: 'Question 4',
        score: 5,
        solution_blocks: [
          {
            text: 'abcdefg',
            display_order: 4,
            solution_order: 4
          }
        ]
      },
      {
        id: 5,
        question: 'Question 5 Question 5 Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5 Question 5 Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5Question 5',
        score: 5,
        solution_blocks: [
          {
            text: 'abcdefg',
            display_order: 5,
            solution_order: 5
          },
          {
            text: 'abcdefg',
            display_order: 5,
            solution_order: 5
          },
          {
            text: 'abcdefg',
            display_order: 5,
            solution_order: 5
          },
          {
            text: 'abcdefg',
            display_order: 5,
            solution_order: 5
          }
        ]
      }
    ]
  }

}
