import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { User } from '../models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public addUser(user: User) {
    const username = user.email;
    const email = user.email;
    const password = user.password;

    return this.http.post(
      `${env.apiHostUrl}/api/auth/signup`,
      {
        username,
        email,
        password
      },
      httpOptions
    );
  }

}
