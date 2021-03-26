import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableService} from '../table/ngtable/ngtable.service';
import {UsuarioRoutes} from './usuario.routing';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {NgxMaskModule} from 'ngx-mask';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    RouterModule.forChild(UsuarioRoutes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxDatatableModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [UsuariosComponent, UsuarioComponent],
  providers: [TableService]
})
export class UsuarioModule {
}
