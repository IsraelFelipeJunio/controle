import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { DataTable } from '../model/data-table';
import { ProjetoAtaReuniao } from '../model/projeto-ata-reuniao';

@Injectable({providedIn: 'root'})
export class ProjetoAtaReuniaoService {

    constructor(private http: HttpClient) { }

    salvar(projetoAtaReuniao: ProjetoAtaReuniao) {

        if (projetoAtaReuniao.id == null) {
            return this.http.post<any>(`${environment.apiUrl}/projetoAtaReuniao/`, projetoAtaReuniao)
                .pipe(map(u => {
                        return projetoAtaReuniao;
                    }
                ));
        } else {
            return this.http.put<any>(`${environment.apiUrl}/projetoAtaReuniao/${projetoAtaReuniao.id}`, projetoAtaReuniao)
                .pipe(map(u => {
                        return projetoAtaReuniao;
                    }
                ));
        }
    }

    consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

        return this.http.get<any>(`${environment.apiUrl}/projetoAtaReuniao/dataTable?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

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

        return this.http.get<any>(`${environment.apiUrl}/projetoAtaReuniao/select?pesquisa=${pesquisa}`);
    }

    consultarPorId(id: any): Observable<ProjetoAtaReuniao> {

        return this.http.get<any>(`${environment.apiUrl}/projetoAtaReuniao/${id}`);
    }

    excluir(id: number): Observable<any> {

        return this.http.delete<any>(`${environment.apiUrl}/projetoAtaReuniao/${id}`);
    }

    consultarPorProjeto(projetoId: any): Observable<ProjetoAtaReuniao[]> {

        return this.http.get<any>(`${environment.apiUrl}/projetoAtaReuniao/consultarPorProjeto/${projetoId}`);
    }

}
