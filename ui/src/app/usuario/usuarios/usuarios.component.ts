import {Component} from '@angular/core';
import {DataTable} from '../../model/data-table';
import {Usuario} from '../../model/usuario';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {UsuarioService} from '../../service/usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosComponent {

  dataTable = new DataTable();
  rows = new Array<Usuario>();

  ColumnMode = ColumnMode;

  public pesquisa = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {

    this.setPage({offset: 0});
  }

  pesquisar() {

    this.dataTable.pageNumber = 0;

    this.usuarioService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });
  }

  setPage(pageInfo: any) {

    this.dataTable.pageNumber = pageInfo.offset;

    this.usuarioService.consultarDataTable(this.dataTable.pageNumber, this.pesquisa).subscribe(pagedData => {
      this.dataTable = pagedData;
    });

  }

  selecionarUsuario({selected}: any) {

    this.router.navigate(['/usuario/' + selected[0].id]);
  }

}
