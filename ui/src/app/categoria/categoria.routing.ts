import { Routes } from '@angular/router';
import {CategoriasComponent} from './categorias/categorias.component';
import {CategoriaComponent} from './categoria/categoria.component';

export const CategoriaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CategoriasComponent,
        data: {
          title: 'Categoria',
          urls: [
            { title: 'Dashboard', url: '/dashboard/classic' },
            { title: 'Consultar Categoria' }
          ]
        }
      },
      {
        path: ':id',
        component: CategoriaComponent,
        data: {
          title: 'Categoria',
          urls: [
            { title: 'Consultar Categoria', url: '/categoria' },
            { title: 'Cadastrar Categoria' }
          ]
        }
      }
    ]
  }
];
