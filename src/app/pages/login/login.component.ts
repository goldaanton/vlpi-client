import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginSubscription: Subscription | undefined;
  private getCuurentUserSubscription: Subscription | undefined;


  public loginData = {
    email: '',
    password: ''
  }

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginSubscription = this.loginService.generateToken(this.loginData).subscribe(
      (data) => {
        console.log(data);

        this.loginService.loginUser(data.accessToken);

        // TODO: handle setting user
        this.getCuurentUserSubscription = this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
          }, (err) => {
            console.log(err);
            this.loginService.setUser({
              email: 'john_doe@hello.com',
              firstName: 'John',
              lastName: 'Doe'
            });
          }
        );
      }, (err) => {
        console.log(err);
      }
    )
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
    this.getCuurentUserSubscription?.unsubscribe();
  }

}
