import { UnidadeMedida } from './../model/unidade-medida';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { DataTable } from '../model/data-table';

@Injectable({providedIn: 'root'})
export class UnidadeMedidaService {

  constructor(private http: HttpClient) { }

  salvar(unidadeMedida: UnidadeMedida) {

    if (unidadeMedida.id == null) {
      return this.http.post<any>(`${environment.apiUrl}/unidadeMedida/`, unidadeMedida)
        .pipe(map(u => {
            return unidadeMedida;
          }
        ));
    } else {
      return this.http.put<any>(`${environment.apiUrl}/unidadeMedida/${unidadeMedida.id}`, unidadeMedida)
        .pipe(map(u => {
            return unidadeMedida;
          }
        ));
    }
  }

  consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

    return this.http.get<any>(`${environment.apiUrl}/unidadeMedida/dataTable?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

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

    return this.http.get<any>(`${environment.apiUrl}/unidadeMedida/select?pesquisa=${pesquisa}`);
  }

  consultarPorId(id: any): Observable<UnidadeMedida> {

    return this.http.get<any>(`${environment.apiUrl}/unidadeMedida/${id}`);
  }

  excluir(id: number): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/unidadeMedida/${id}`);
  }
}
