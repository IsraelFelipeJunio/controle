import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { Recurso } from '../../model/recurso';
import { DataTable } from '../../model/data-table';
import { RecursoService } from '../../service/recurso.service';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.css']
})
export class RecursosComponent {

  dataTable = new DataTable();
  rows = new Array<Recurso>();

  ColumnMode = ColumnMode;

  public pesquisa = '';

  constructor(private recursoService: RecursoService, private router: Router) {

    this.setPage({offset: 0});
  }

  pesquisar() {

    this.dataTable.pageNumber = 0;

    this.recursoService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });
  }

  setPage(pageInfo: any) {

    this.dataTable.pageNumber = pageInfo.offset;

    this.recursoService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });

  }

  selecionarRecurso({selected}: any) {

    this.router.navigate(['/recurso/' + selected[0].id]);
  }

}
