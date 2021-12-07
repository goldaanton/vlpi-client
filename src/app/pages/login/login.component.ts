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
  private getUserSubscription!: Subscription;

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
      (authData) => {
        this.loginService.setToken(authData.accessToken);

        this.getUserSubscription = this.loginService.getCurrentUser().subscribe(
          (userData) => {
            this.loginService.setUser(userData);

            this.router.navigate(['']).then(() => {
              window.location.reload();
            });

          }, (userErr) => {
            console.log(userErr);

            this.snackBar.open('Something went wrong. Look in the console for details.', '', {
              duration: 3000
            });
          }
        );
      }, (authErr) => {
        console.log(authErr);

        this.snackBar.open('Your credentials are invalid', '', {
          duration: 3000
        });
      }
    )
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
    this.getUserSubscription?.unsubscribe();
  }

}
