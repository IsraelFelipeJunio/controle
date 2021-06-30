import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { Tarefa } from '../../model/tarefa';
import { DataTable } from '../../model/data-table';
import { TarefaService } from '../../service/tarefa.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.css']
})
export class TarefasComponent {

  dataTable = new DataTable();
  rows = new Array<Tarefa>();

  ColumnMode = ColumnMode;

  public pesquisa = '';

  constructor(private tarefaService: TarefaService, private router: Router) {

    this.setPage({offset: 0});
  }

  pesquisar() {

    this.dataTable.pageNumber = 0;

    this.tarefaService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });
  }

  setPage(pageInfo: any) {

    this.dataTable.pageNumber = pageInfo.offset;

    this.tarefaService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });

  }

  selecionarTarefa({selected}: any) {

    this.router.navigate(['/tarefa/' + selected[0].id]);
  }

}
