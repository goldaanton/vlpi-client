import { Component, OnDestroy, OnInit } from '@angular/core';
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signupSubscription = this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      }
    )
  }

  ngOnDestroy(): void {
    this.signupSubscription?.unsubscribe()
  }

}
