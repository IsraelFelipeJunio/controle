import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Categoria } from '../model/categoria';
import { DataTable } from '../model/data-table';

@Injectable({providedIn: 'root'})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  salvar(categoria: Categoria) {

    if (categoria.id == null) {
      return this.http.post<any>(`${environment.apiUrl}/categoria/`, categoria)
        .pipe(map(u => {
            return categoria;
          }
        ));
    } else {
      return this.http.put<any>(`${environment.apiUrl}/categoria/${categoria.id}`, categoria)
        .pipe(map(u => {
            return categoria;
          }
        ));
    }
  }

  consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

    return this.http.get<any>(`${environment.apiUrl}/categoria/dataTable?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

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

    return this.http.get<any>(`${environment.apiUrl}/categoria/select?pesquisa=${pesquisa}`);
  }

  consultarPorId(id: any): Observable<Categoria> {

    return this.http.get<any>(`${environment.apiUrl}/categoria/${id}`);
  }

  excluir(id: number): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/categoria/${id}`);
  }
}
