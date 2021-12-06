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
    this.userName = this.loginService.getUser().name;
  }

  public logOut(): void {
    this.isUserLoggedIn = false;
    this.loginService.logOut();
    window.location.reload();
  }

}
