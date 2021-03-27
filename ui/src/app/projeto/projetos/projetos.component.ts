import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { DataTable } from '../../model/data-table';
import { Projeto } from '../../model/projeto';
import { ProjetoService } from '../../service/projeto.service';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.css']
})
export class ProjetosComponent {

  dataTable = new DataTable();
  rows = new Array<Projeto>();

  ColumnMode = ColumnMode;

  public pesquisa = '';

  constructor(private projetoService: ProjetoService, private router: Router) {

    this.setPage({offset: 0});
  }

  pesquisar() {

    this.dataTable.pageNumber = 0;

    this.projetoService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });
  }

  setPage(pageInfo: any) {

    this.dataTable.pageNumber = pageInfo.offset;

    this.projetoService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });

  }

  selecionarProjeto({selected}: any) {

    this.router.navigate(['/projeto/' + selected[0].id]);
  }

}
