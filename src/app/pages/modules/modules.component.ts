import { Component, OnInit } from '@angular/core';
import { ModulesService } from 'src/app/services/modules.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {

  public modules: any;

  constructor(
    private modulesService: ModulesService
  ) { }

  ngOnInit(): void {
    this.modules = this.modulesService.getModules();
  }

}
