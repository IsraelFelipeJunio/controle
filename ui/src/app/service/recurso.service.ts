import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { DataTable } from '../model/data-table';
import { Recurso } from '../model/recurso';

@Injectable({providedIn: 'root'})
export class RecursoService {

  constructor(private http: HttpClient) { }

  salvar(recurso: Recurso) {

    if (recurso.id == null) {
      return this.http.post<any>(`${environment.apiUrl}/recurso/`, recurso)
        .pipe(map(u => {
            return recurso;
          }
        ));
    } else {
      return this.http.put<any>(`${environment.apiUrl}/recurso/${recurso.id}`, recurso)
        .pipe(map(u => {
            return recurso;
          }
        ));
    }
  }

  consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

    return this.http.get<any>(`${environment.apiUrl}/recurso/dataTable?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

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

    return this.http.get<any>(`${environment.apiUrl}/recurso/select?pesquisa=${pesquisa}`);
  }

  consultarPorId(id: any): Observable<Recurso> {

    return this.http.get<any>(`${environment.apiUrl}/recurso/${id}`);
  }

  excluir(id: number): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/recurso/${id}`);
  }
}
