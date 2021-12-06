import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit, OnDestroy {

  public modules: any;
  public admin!: boolean;

  private modulesSunscription!: Subscription;

  constructor(
    private loginService: LoginService,
    private modulesService: ModulesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.modulesSunscription = this.modulesService.getModules().subscribe(
      (data) => {
        this.modules = data;
      }, (err) => {
        console.log(err);
        this.snackBar.open('Something went wrong. Look in the console for details.', '', {
          duration: 5000
        });
      }
    )

    this.admin = this.loginService.getUserRole() == "admin";
  }

  ngOnDestroy(): void {
    this.modulesSunscription?.unsubscribe();
  }

}
