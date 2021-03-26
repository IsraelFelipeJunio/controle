import {Component} from '@angular/core';
import {DataTable} from '../../model/data-table';
import {CentroCusto} from '../../model/centro-custo';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {Router} from '@angular/router';
import {CentroCustoService} from '../../service/centro-custo.service';

@Component({
  selector: 'app-centros-custo',
  templateUrl: './centros-custo.component.html',
  styleUrls: ['./centros-custo.css']
})
export class CentrosCustoComponent {

  dataTable = new DataTable();
  rows = new Array<CentroCusto>();

  ColumnMode = ColumnMode;

  public pesquisa = '';

  constructor(private centroCustoService: CentroCustoService, private router: Router) {

    this.setPage({offset: 0});
  }

  pesquisar() {

    this.dataTable.pageNumber = 0;

    this.centroCustoService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });
  }

  setPage(pageInfo: any) {

    this.dataTable.pageNumber = pageInfo.offset;

    this.centroCustoService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });

  }

  selecionarCentroCusto({selected}: any) {

    this.router.navigate(['/centro-custo/' + selected[0].id]);
  }

}
