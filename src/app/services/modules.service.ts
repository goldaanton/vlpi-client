import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(
    private http: HttpClient
  ) { }

  public getModules() {
    // return this.http.get(
    //   `${env.apiHostUrl}/api/modules`
    // )

    return [
      {
        id: 1,
        name: 'Requirement Analysis',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus'
      },
      {
        id: 2,
        name: 'Design',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      },
      {
        id: 3,
        name: 'Modeling',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      },
      {
        id: 4,
        name: 'Implementation',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      },
      {
        id: 5,
        name: 'Quality Assurance',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      }
    ]
  }

  public getExercises(moduleId: any): any {
    return [
      {
        id: 1,
        name: 'Exercise 1',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus'
      },
      {
        id: 2,
        name: 'Exercise 2',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      },
      {
        id: 3,
        name: 'Exercise 3',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      },
      {
        id: 4,
        name: 'Exercise 4',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      },
      {
        id: 5,
        name: 'Exercise 5',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      },
      {
        id: 6,
        name: 'Exercise 6',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus'
      },
      {
        id: 7,
        name: 'Exercise 7',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      },
      {
        id: 8,
        name: 'Exercise 8',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      },
      {
        id: 9,
        name: 'Exercise 9',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      },
      {
        id: 10,
        name: 'Exercise 10',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sunt ducimus eveniet aut. Ipsa, voluptatibus tempora omnis assumenda dignissimos est asperiores fugiat, laboriosam beatae adipisci temporibus. Quam numquam sint explicabo.'
      }
    ]
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
        question: 'Question 5',
        score: 5,
        solution_blocks: [
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
