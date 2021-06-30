import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { TableService } from '../table/ngtable/ngtable.service';
import { TarefaRoutes } from './tarefa.routing';
import { TarefaComponent } from './tarefa/tarefa.component';
import { TarefasComponent } from './tarefas/tarefas.component';

@NgModule({
  imports: [
    RouterModule.forChild(TarefaRoutes),
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule
  ],
  declarations: [TarefasComponent, TarefaComponent],
  providers: [TableService]
})
export class TarefaModule {
}
