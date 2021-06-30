import { Routes } from '@angular/router';

import { RecursoComponent } from './recurso/recurso.component';
import { RecursosComponent } from './recursos/recursos.component';

export const RecursoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RecursosComponent,
        data: {
          title: 'Recurso',
          urls: [
            { title: 'Dashboard', url: '/dashboard/classic' },
            { title: 'Consultar Recurso' }
          ]
        }
      },
      {
        path: ':id',
        component: RecursoComponent,
        data: {
          title: 'Recurso',
          urls: [
            { title: 'Consultar Recurso', url: '/recurso' },
            { title: 'Cadastrar Recurso' }
          ]
        }
      }
    ]
  }
];
