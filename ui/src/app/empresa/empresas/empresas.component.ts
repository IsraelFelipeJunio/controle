import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { DataTable } from '../../model/data-table';
import { Empresa } from '../../model/empresa';
import { EmpresaService } from '../../service/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.css']
})
export class EmpresasComponent {

  dataTable = new DataTable();
  rows = new Array<Empresa>();

  ColumnMode = ColumnMode;

  public pesquisa = '';

  constructor(private empresaService: EmpresaService, private router: Router) {

    this.setPage({offset: 0});
  }

  pesquisar() {

    this.dataTable.pageNumber = 0;

    this.empresaService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });
  }

  setPage(pageInfo: any) {

    this.dataTable.pageNumber = pageInfo.offset;

    this.empresaService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });

  }

  selecionarEmpresa({selected}: any) {

    this.router.navigate(['/empresa/' + selected[0].id]);
  }

}
