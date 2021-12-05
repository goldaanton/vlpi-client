import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginSubscription!: Subscription;

  public loginData = {
    email: '',
    password: ''
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginSubscription = this.loginService.generateToken(this.loginData).subscribe(
      (data) => {
        console.log(data);

        this.loginService.loginUser(data.accessToken);

        this.router.navigate(['']).then(() => {
          window.location.reload();
        });

      }, (err) => {
        console.log(err);

        this.snackBar.open('Your credentials are invalid', '', {
          duration: 3000
        });
      }
    )
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

}
