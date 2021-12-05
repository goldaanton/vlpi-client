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

  signupSubscription: Subscription | undefined;

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
      (data) => {
        console.log(data);

        this.router.navigate(['login']);
      }, (err) => {
        console.log(err);

        this.snackBar.open('Email is already in use', '', {
          duration: 3000
        });
      }
    )
  }

  ngOnDestroy(): void {
    this.signupSubscription?.unsubscribe()
  }

}
