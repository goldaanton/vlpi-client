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

}
