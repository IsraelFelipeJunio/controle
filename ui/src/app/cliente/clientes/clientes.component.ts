import {Component} from '@angular/core';
import {DataTable} from '../../model/data-table';
import {Cliente} from '../../model/cliente';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {ClienteService} from '../../service/cliente.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.css']
})
export class ClientesComponent {

  dataTable = new DataTable();
  rows = new Array<Cliente>();

  ColumnMode = ColumnMode;

  public pesquisa = '';

  constructor(private clienteService: ClienteService, private router: Router) {

    this.setPage({offset: 0});
  }

  pesquisar() {

    this.dataTable.pageNumber = 0;

    this.clienteService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });
  }

  setPage(pageInfo: any) {

    this.dataTable.pageNumber = pageInfo.offset;

    this.clienteService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });

  }

  selecionarCliente({selected}: any) {

    this.router.navigate(['/cliente/' + selected[0].id]);
  }

}
