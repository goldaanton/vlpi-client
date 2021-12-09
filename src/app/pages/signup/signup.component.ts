import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupSubscription!: Subscription;
  getUserSubscription!: Subscription;

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('passwordConfirmation')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  public user: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required)
  }, { validators: this.checkPasswords });

  constructor(
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signupSubscription = this.loginService.register(this.user.value).subscribe(
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

  get firstName() { return this.user.get('firstName'); }
  get lastName() { return this.user.get('lastName'); }
  get email() { return this.user.get('email'); }
  get password() { return this.user.get('password'); }
  get passwordConfirmation() { return this.user.get('passwordConfirmation'); }

}
