import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { User } from '../models';
import jwt_decode from 'jwt-decode';

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

  public register(user: User): Observable<any> {
    const firstName = user.firstName;
    const lastName = user.lastName;
    const username = user.email;
    const password = user.password;

    return this.http.post(
      `${env.apiHostUrl}/authentication/registration`,
      {
        firstName,
        lastName,
        username,
        password
      },
      httpOptions
    );
  }

  public generateToken(loginData: any): Observable<any> {
    const username = loginData.email;
    const password = loginData.password;

    return this.http.post(
      `${env.apiHostUrl}/authentication`,
      {
        username,
        password
      },
      httpOptions
    )
  }

  public getCurrentUser(): Observable<any> {
    return this.http.get(`${env.apiHostUrl}/user/current`);
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);

    let parsedToken = this.parseToken(token);
    let role = parsedToken.authorities.includes('ROLE_ADMINISTRATOR') ? 'admin' : 'student';
    localStorage.setItem('role', role);
  }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
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
    let token = localStorage.getItem('token');

    if (token) {
      return token;
    } else {
      this.logOut();
      return null;
    }
  }

  public getUser() {
    let user = localStorage.getItem('user');

    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logOut();
      return null;
    }
  }

  public getUserRole(): string | null {
    let role = localStorage.getItem('role');

    if (role != null) {
      return role;
    } else {
      this.logOut();
      return null;
    }
  }

  private parseToken(token: string): any {
    return jwt_decode(token);
  }

}
