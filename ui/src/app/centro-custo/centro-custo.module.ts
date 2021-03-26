import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableService} from '../table/ngtable/ngtable.service';
import {CentroCustoRoutes} from './centro-custo.routing';
import {CentroCustoComponent} from './centro-custo/centro-custo.component';
import {CentrosCustoComponent} from './centros-custo/centros-custo.component';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    RouterModule.forChild(CentroCustoRoutes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule
  ],
  declarations: [CentrosCustoComponent, CentroCustoComponent],
  providers: [TableService]
})
export class CentroCustoModule {
}
