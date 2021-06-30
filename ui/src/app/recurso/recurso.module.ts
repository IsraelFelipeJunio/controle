import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TableService } from '../table/ngtable/ngtable.service';
import { RecursoRoutes } from './recurso.routing';
import { RecursoComponent } from './recurso/recurso.component';
import { RecursosComponent } from './recursos/recursos.component';


@NgModule({
  imports: [
    RouterModule.forChild(RecursoRoutes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule
  ],
  declarations: [RecursosComponent, RecursoComponent],
  providers: [
    TableService,
  ]
})
export class RecursoModule { }
