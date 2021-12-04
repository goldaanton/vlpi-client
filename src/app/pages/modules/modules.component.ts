import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  public modules: any;
  public admin!: boolean;

  constructor(
    private loginService: LoginService,
    private modulesService: ModulesService
  ) { }

  ngOnInit(): void {
    this.modules = this.modulesService.getModules();
    this.admin = this.loginService.getUserRole() == "admin";
  }

}
