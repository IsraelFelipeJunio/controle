import { Routes } from '@angular/router';
import {CentrosCustoComponent} from './centros-custo/centros-custo.component';
import {CentroCustoComponent} from './centro-custo/centro-custo.component';

export const CentroCustoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CentrosCustoComponent,
        data: {
          title: 'Centro de Custo',
          urls: [
            { title: 'Dashboard', url: '/dashboard/classic' },
            { title: 'Consultar Centro de Custo' }
          ]
        }
      },
      {
        path: ':id',
        component: CentroCustoComponent,
        data: {
          title: 'Centro de Custo',
          urls: [
            { title: 'Consultar Centro de Custo', url: '/centro-custo' },
            { title: 'Cadastrar Centro de Custo' }
          ]
        }
      }
    ]
  }
];
