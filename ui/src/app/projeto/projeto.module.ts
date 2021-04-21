import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';

import { TableService } from '../table/ngtable/ngtable.service';
import { ProjetoRoutes } from './projeto.routing';
import { ProjetoComponent } from './projeto/projeto.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    RouterModule.forChild(ProjetoRoutes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [ProjetosComponent,ProjetoComponent],
  providers: [TableService]
})
export class ProjetoModule {}
