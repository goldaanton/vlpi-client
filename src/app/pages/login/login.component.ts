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
      }, (err) => {
        console.log(err);
      }
    )
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe;
  }

}
