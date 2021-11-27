import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { User } from '../models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  public generateToken(loginData: any): Observable<any> {
    const username = loginData.email;
    const password = loginData.password;

    return this.http.post(
      `${env.apiHostUrl}/api/auth/signin`,
      {
        username,
        password
      },
      httpOptions
    )
  }

  public loginUser(token: string): void {
    localStorage.setItem('token', token);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem('token');

    if (token == undefined || token == null || token == "") {
      return false;
    }

    return true;
  }

  public logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): User | null {
    let user = localStorage.getItem('user');

    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logOut();
      return null;
    }
  }

}
