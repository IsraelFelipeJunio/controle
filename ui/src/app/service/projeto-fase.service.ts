import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { DataTable } from '../model/data-table';
import { ProjetoFase } from '../model/projeto-fase';

@Injectable({providedIn: 'root'})
export class ProjetoFaseService {

    constructor(private http: HttpClient) { }

    salvar(projetoFase: ProjetoFase) {

        if (projetoFase.id == null) {
            return this.http.post<any>(`${environment.apiUrl}/projetoFase/`, projetoFase)
                .pipe(map(u => {
                        return projetoFase;
                    }
                ));
        } else {
            return this.http.put<any>(`${environment.apiUrl}/projetoFase/${projetoFase.id}`, projetoFase)
                .pipe(map(u => {
                        return projetoFase;
                    }
                ));
        }
    }

    consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

        return this.http.get<any>(`${environment.apiUrl}/projetoFase/dataTable?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

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

        return this.http.get<any>(`${environment.apiUrl}/projetoFase/select?pesquisa=${pesquisa}`);
    }

    consultarSelectPorProjeto(pesquisa: any, projetoId: number): Observable<any> {
    
        return projetoId != null ?
               this.http.get<any>(`${environment.apiUrl}/projetoFase/consultarFasePorProjeto?pesquisa=${pesquisa}&projetoId=${projetoId}`) :
               this.http.get<any>(`${environment.apiUrl}/projetoFase/select?pesquisa=${pesquisa}`);
    }

    consultarPorId(id: any): Observable<ProjetoFase> {

        return this.http.get<any>(`${environment.apiUrl}/projetoFase/${id}`);
    }

    excluir(id: number): Observable<any> {

        return this.http.delete<any>(`${environment.apiUrl}/projetoFase/${id}`);
    }

    consultarPorProjeto(projetoId: any): Observable<ProjetoFase[]> {

        return this.http.get<any>(`${environment.apiUrl}/projetoFase/consultarPorProjeto/${projetoId}`);
    }

}
