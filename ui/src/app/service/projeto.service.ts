import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { DataTable } from '../model/data-table';
import { Projeto } from '../model/projeto';

@Injectable({providedIn: 'root'})
export class ProjetoService {

    constructor(private http: HttpClient) { }

    salvar(projeto: Projeto) {

        if (projeto.id == null) {
            return this.http.post<any>(`${environment.apiUrl}/projeto/`, projeto)
                .pipe(map(u => {
                        return projeto;
                    }
                ));
        } else {
            return this.http.put<any>(`${environment.apiUrl}/projeto/${projeto.id}`, projeto)
                .pipe(map(u => {
                        return projeto;
                    }
                ));
        }
    }

    consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

        return this.http.get<any>(`${environment.apiUrl}/projeto/dataTable?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

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

        return this.http.get<any>(`${environment.apiUrl}/projeto/select?pesquisa=${pesquisa}`);
    }

    consultarPorId(id: any): Observable<Projeto> {

        return this.http.get<any>(`${environment.apiUrl}/projeto/${id}`);
    }

    excluir(id: number): Observable<any> {

        return this.http.delete<any>(`${environment.apiUrl}/projeto/${id}`);
    }

}
