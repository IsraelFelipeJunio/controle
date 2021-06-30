import { Routes } from '@angular/router';

import { UnidadeMedidaComponent } from './unidade-medida/unidade-medida.component';
import { UnidadeMedidasComponent } from './unidade-medidas/unidade-medidas.component';

export const UnidadeMedidaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: UnidadeMedidasComponent,
        data: {
          title: 'Unidade de Medida',
          urls: [
            { title: 'Dashboard', url: '/dashboard/classic' },
            { title: 'Consultar Unidade de Medida' }
          ]
        }
      },
      {
        path: ':id',
        component: UnidadeMedidaComponent,
        data: {
          title: 'Unidade de Medida',
          urls: [
            { title: 'Consultar Unidade de Medida', url: '/unidade-medida' },
            { title: 'Cadastrar Unidade de Medida' }
          ]
        }
      }
    ]
  }
];
