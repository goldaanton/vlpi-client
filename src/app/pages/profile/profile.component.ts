import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public userName!: string;
  public statistics!: any;

  private statisticsSubscription!: Subscription;

  constructor(
    private loginService: LoginService,
    private snackService: SnackBarService
  ) { }

  ngOnInit(): void {
    let user = this.loginService.getUser();
    this.userName = `${user.firstName} ${user.lastName}`;

    this.statisticsSubscription = this.loginService.getUserStatistics()
      .subscribe(
        (data) => {
          console.log(data);
          this.statistics = data;
        }, (err) => {
          this.snackService.showError(err);
        }
      );
  }

  onEditClick() {
    this.snackService.showMessage('This feature is coming. We are doing our best to make You satisfied.');
  }

  ngOnDestroy(): void {
    this.statisticsSubscription?.unsubscribe();
  }

}
