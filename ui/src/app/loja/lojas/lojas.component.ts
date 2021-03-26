import {Component} from '@angular/core';
import {DataTable} from '../../model/data-table';
import {Loja} from '../../model/loja';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {LojaService} from '../../service/loja.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.css']
})
export class LojasComponent {

  dataTable = new DataTable();
  rows = new Array<Loja>();

  ColumnMode = ColumnMode;

  public pesquisa = '';

  constructor(private lojaService: LojaService, private router: Router) {

    this.setPage({offset: 0});
  }

  pesquisar() {

    this.dataTable.pageNumber = 0;

    this.lojaService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });
  }

  setPage(pageInfo: any) {

    this.dataTable.pageNumber = pageInfo.offset;

    this.lojaService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });

  }

  selecionarLoja({selected}: any) {

    this.router.navigate(['/loja/' + selected[0].id]);
  }

}
