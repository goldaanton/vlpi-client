import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userName!: string;

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userName = this.loginService.getUser().name;
  }

  onEditClick() {
    this.snackBar.open('This feature is coming. We are doing our best to make You satisfied.', '', {
      duration: 3000
    });
  }

}
