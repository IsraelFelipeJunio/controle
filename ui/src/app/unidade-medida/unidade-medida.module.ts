import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TableService } from '../table/ngtable/ngtable.service';
import { UnidadeMedidaRoutes } from './unidade-medida.routing';
import { UnidadeMedidaComponent } from './unidade-medida/unidade-medida.component';
import { UnidadeMedidasComponent } from './unidade-medidas/unidade-medidas.component';

@NgModule({
  imports: [
    RouterModule.forChild(UnidadeMedidaRoutes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule
  ],
  declarations: [UnidadeMedidasComponent, UnidadeMedidaComponent],
  providers: [TableService]
})
export class UnidadeMedidaModule {
}
