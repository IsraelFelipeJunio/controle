import { Routes } from '@angular/router';
import {LojasComponent} from './lojas/lojas.component';
import {LojaComponent} from './loja/loja.component';

export const LojaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LojasComponent,
        data: {
          title: 'Cadastro da Loja',
          urls: [
            { title: 'Dashboard', url: '/dashboard/classic' },
            { title: 'Consultar Lojas' }
          ]
        }
      },
      {
        path: ':id',
        component: LojaComponent,
        data: {
          title: 'Cadastro da Loja',
          urls: [
            { title: 'Consultar Loja', url: '/loja' },
            { title: 'Cadastrar Loja' }
          ]
        }
      }
    ]
  }
];
