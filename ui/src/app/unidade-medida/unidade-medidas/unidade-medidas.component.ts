import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { UnidadeMedida } from '../../model/unidade-medida';
import { DataTable } from '../../model/data-table';
import { UnidadeMedidaService } from '../../service/unidade-medida.service';

@Component({
  selector: 'app-unidade-medidas',
  templateUrl: './unidade-medidas.component.html',
  styleUrls: ['./unidade-medidas.css']
})
export class UnidadeMedidasComponent {

  dataTable = new DataTable();
  rows = new Array<UnidadeMedida>();

  ColumnMode = ColumnMode;

  public pesquisa = '';

  constructor(private unidadeMedidaService: UnidadeMedidaService, private router: Router) {

    this.setPage({offset: 0});
  }

  pesquisar() {

    this.dataTable.pageNumber = 0;

    this.unidadeMedidaService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });
  }

  setPage(pageInfo: any) {

    this.dataTable.pageNumber = pageInfo.offset;

    this.unidadeMedidaService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });

  }

  selecionarUnidadeMedida({selected}: any) {

    this.router.navigate(['/unidade-medida/' + selected[0].id]);
  }

}
