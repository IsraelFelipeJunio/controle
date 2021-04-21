import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { DataTable } from '../model/data-table';
import { Empresa } from '../model/empresa';
import { Usuario } from '../model/usuario';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({providedIn: 'root'})
export class UsuarioService {

  constructor(private http: HttpClient, private autenticacaoService: AutenticacaoService) {

  }

  consultarPorId(id: any): Observable<Usuario> {

    return this.http.get<any>(`${environment.apiUrl}/usuario/${id}`);
  }

  cadastrar(usuario: Usuario) {

    return this.http.post<any>(`${environment.apiUrl}/usuario`, usuario)
      .pipe(map(u => {
        return usuario;
      }));
  }

  recuperarSenha(usuario: Usuario) {

    return this.http.post<any>(`${environment.apiUrl}/usuario/recuperarSenha`, usuario)
      .pipe(map(u => {
        return usuario;
      }));
  }

  alterar(usuario: Usuario) {

    return this.http.put<any>(`${environment.apiUrl}/usuario/${usuario.id}`, usuario)
      .pipe(map(u => {
        return usuario;
      }));
  }

  usuarioLogado() {

    return this.http.get<Usuario>(`${environment.apiUrl}/usuario/${this.autenticacaoService.usuarioLogado.id}`)
      .pipe(map(usuario => {
        return usuario;
      }));
  }

  alterarEmpresa(empresa: Empresa, usuario: Usuario) {

    return this.http.put<any>(`${environment.apiUrl}/usuario/${usuario.id}/empresa`, empresa)
      .pipe(map(u => {
        return usuario;
      }));
  }

  alterarSenha(senha: string, usuario: Usuario) {

    return this.http.put<any>(`${environment.apiUrl}/usuario/${usuario.id}/senha`, senha)
      .pipe(map(u => {
        return usuario;
      }));
  }

  excluir(id: number): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/usuario/${id}`);
  }

  salvar(usuario: Usuario) {

    if (usuario.id == null) {
      return this.http.post<any>(`${environment.apiUrl}/usuario/`, usuario)
        .pipe(map(u => {
            return usuario;
          }
        ));
    } else {
      return this.http.put<any>(`${environment.apiUrl}/usuario/${usuario.id}`, usuario)
        .pipe(map(u => {
            return usuario;
          }
        ));
    }
  }

  consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

    return this.http.get<any>(`${environment.apiUrl}/usuario/dataTable2?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

        const dataTable = new DataTable();

        dataTable.totalElements = dt.totalElements;
        dataTable.pageNumber = dt.number;
        dataTable.rows = dt.content;
        dataTable.totalPages = dt.totalPages;

        return dataTable;
      }
    ));
  }

  consultarSelect(pesquisa: any): Observable<any> {

    return this.http.get<any>(`${environment.apiUrl}/usuario/select?pesquisa=${pesquisa}`);
  }

}
