import { Routes } from '@angular/router';

import { TarefaComponent } from './tarefa/tarefa.component';
import { TarefasComponent } from './tarefas/tarefas.component';

export const TarefaRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TarefasComponent,
        data: {
          title: 'Tarefa',
          urls: [
            { title: 'Dashboard', url: '/dashboard/classic' },
            { title: 'Consultar Tarefa' }
          ]
        }
      },
      {
        path: ':id',
        component: TarefaComponent,
        data: {
          title: 'Tarefa',
          urls: [
            { title: 'Consultar Tarefa', url: '/tarefa' },
            { title: 'Cadastrar Tarefa' }
          ]
        }
      }
    ]
  }
];
