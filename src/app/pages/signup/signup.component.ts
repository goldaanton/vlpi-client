import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

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
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signupSubscription = this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['login']);
      }, (err) => {
        console.log(err);
      }
    )
  }

  ngOnDestroy(): void {
    this.signupSubscription?.unsubscribe()
  }

}
