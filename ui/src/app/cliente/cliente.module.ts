import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableService} from '../table/ngtable/ngtable.service';
import {ClienteRoutes} from './cliente.routing';
import {ClientesComponent} from './clientes/clientes.component';
import {ClienteComponent} from './cliente/cliente.component';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    RouterModule.forChild(ClienteRoutes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [ClientesComponent,ClienteComponent],
  providers: [TableService]
})
export class ClienteModule {}
