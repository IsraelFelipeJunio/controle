import { Routes } from '@angular/router';
import {ClientesComponent} from './clientes/clientes.component';
import {ClienteComponent} from './cliente/cliente.component';

export const ClienteRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ClientesComponent,
        data: {
          title: 'Cadastro do Cliente',
          urls: [
            { title: 'Dashboard', url: '/dashboard/classic' },
            { title: 'Consultar Clientes' }
          ]
        }
      },
      {
        path: ':id',
        component: ClienteComponent,
        data: {
          title: 'Cadastro do Cliente',
          urls: [
            { title: 'Consultar Cliente', url: '/cliente' },
            { title: 'Cadastrar Cliente' }
          ]
        }
      }
    ]
  }
];
