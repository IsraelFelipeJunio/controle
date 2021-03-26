import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableService} from '../table/ngtable/ngtable.service';
import {LojaRoutes} from './loja.routing';
import {LojasComponent} from './lojas/lojas.component';
import {LojaComponent} from './loja/loja.component';
import {NgxMaskModule} from 'ngx-mask';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    RouterModule.forChild(LojaRoutes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [LojasComponent, LojaComponent],
  providers: [TableService]
})
export class LojaModule {
}
