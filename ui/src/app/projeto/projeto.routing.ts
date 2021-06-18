import { Routes } from '@angular/router';
import {ProjetosComponent} from './projetos/projetos.component';
import {ProjetoComponent} from './projeto/projeto.component';

export const ProjetoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProjetosComponent,
        data: {
          title: 'Cadastro do Projeto',
          urls: [
            { title: 'Dashboard', url: '/dashboard/classic' },
            { title: 'Consultar Projetos' }
          ]
        }
      },
      {
        path: ':id',
        component: ProjetoComponent,
        data: {
          title: 'Cadastro do Projeto',
          urls: [
            { title: 'Consultar Projeto', url: '/projeto' },
            { title: 'Cadastrar Projeto' }
          ]
        }
      }
    ]
  }
];
