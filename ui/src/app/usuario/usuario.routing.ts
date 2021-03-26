import { Routes } from '@angular/router';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {UsuarioComponent} from './usuario/usuario.component';

export const UsuarioRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: UsuariosComponent,
        data: {
          title: 'Cadastro da Usuario',
          urls: [
            { title: 'Dashboard', url: '/dashboard/classic' },
            { title: 'Consultar Usuarios' }
          ]
        }
      },
      {
        path: ':id',
        component: UsuarioComponent,
        data: {
          title: 'Cadastro da Usuario',
          urls: [
            { title: 'Consultar Usuario', url: '/usuario' },
            { title: 'Cadastrar Usuario' }
          ]
        }
      }
    ]
  }
];
