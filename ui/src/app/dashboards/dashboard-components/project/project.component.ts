import { Component } from '@angular/core';
import { DashboardService } from '../../../service/dashboard.service';
import { DashboardDTO } from '../../../model/dashboard-dto';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent {

  dashboardDTO: DashboardDTO = new DashboardDTO();

  constructor(
    private dashboardService: DashboardService,
  ) {
    this.dashboardService.listarDashboard().subscribe(dashboard => {
      this.dashboardDTO = dashboard;
    });
  }
  
}
