import { Routes } from '@angular/router';
import {EmpresasComponent} from './empresas/empresas.component';
import {EmpresaComponent} from './empresa/empresa.component';

export const EmpresaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EmpresasComponent,
        data: {
          title: 'Cadastro da Empresa',
          urls: [
            { title: 'Dashboard', url: '/dashboard/classic' },
            { title: 'Consultar Empresas' }
          ]
        }
      },
      {
        path: ':id',
        component: EmpresaComponent,
        data: {
          title: 'Cadastro da Empresa',
          urls: [
            { title: 'Consultar Empresa', url: '/empresa' },
            { title: 'Cadastrar Empresa' }
          ]
        }
      }
    ]
  }
];
