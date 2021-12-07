import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isUserLoggedIn: boolean = false;
  public userName!: string;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.loginService.isLoggedIn();
    if (this.isUserLoggedIn) {
      let user = this.loginService.getUser();
      this.userName = `${user.firstName} ${user.lastName}`;
    }
  }

  public logOut(): void {
    this.isUserLoggedIn = false;
    this.loginService.logOut();
    window.location.reload();
  }

}
