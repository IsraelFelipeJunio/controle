import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';

import { TableService } from '../table/ngtable/ngtable.service';
import { EmpresaRoutes } from './empresa.routing';
import { EmpresaComponent } from './empresa/empresa.component';
import { EmpresasComponent } from './empresas/empresas.component';

@NgModule({
  imports: [
    RouterModule.forChild(EmpresaRoutes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [EmpresasComponent, EmpresaComponent],
  providers: [TableService]
})
export class EmpresaModule {}
