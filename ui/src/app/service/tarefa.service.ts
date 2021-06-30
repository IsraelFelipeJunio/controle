import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { DataTable } from '../model/data-table';
import { Tarefa } from '../model/tarefa';

@Injectable({providedIn: 'root'})
export class TarefaService {

  constructor(private http: HttpClient) { }

  salvar(tarefa: Tarefa) {

    if (tarefa.id == null) {
      return this.http.post<any>(`${environment.apiUrl}/tarefa/`, tarefa)
        .pipe(map(u => {
            return tarefa;
          }
        ));
    } else {
      return this.http.put<any>(`${environment.apiUrl}/tarefa/${tarefa.id}`, tarefa)
        .pipe(map(u => {
            return tarefa;
          }
        ));
    }
  }

  consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

    return this.http.get<any>(`${environment.apiUrl}/tarefa/dataTable?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

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

    return this.http.get<any>(`${environment.apiUrl}/tarefa/select?pesquisa=${pesquisa}`);
  }

  consultarPorId(id: any): Observable<Tarefa> {

    return this.http.get<any>(`${environment.apiUrl}/tarefa/${id}`);
  }

  excluir(id: number): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/tarefa/${id}`);
  }
}
