import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupSubscription!: Subscription;
  getUserSubscription!: Subscription;

  public user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signupSubscription = this.loginService.register(this.user).subscribe(
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
      }, (err) => {
        console.log(err);

        this.snackBar.open('Email is already in use', '', {
          duration: 3000
        });
      }
    )
  }

  ngOnDestroy(): void {
    this.signupSubscription?.unsubscribe();
    this.getUserSubscription?.unsubscribe();
  }

}
