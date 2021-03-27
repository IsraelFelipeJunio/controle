import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';

import { Categoria } from '../../model/categoria';
import { DataTable } from '../../model/data-table';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.css']
})
export class CategoriasComponent {

  dataTable = new DataTable();
  rows = new Array<Categoria>();

  ColumnMode = ColumnMode;

  public pesquisa = '';

  constructor(private categoriaService: CategoriaService, private router: Router) {

    this.setPage({offset: 0});
  }

  pesquisar() {

    this.dataTable.pageNumber = 0;

    this.categoriaService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });
  }

  setPage(pageInfo: any) {

    this.dataTable.pageNumber = pageInfo.offset;

    this.categoriaService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });

  }

  selecionarCategoria({selected}: any) {

    this.router.navigate(['/categoria/' + selected[0].id]);
  }

}
