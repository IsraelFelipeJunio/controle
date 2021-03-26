import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Loja} from '../model/loja';
import {DataTable} from '../model/data-table';

@Injectable({providedIn: 'root'})
export class LojaService {

  constructor(private http: HttpClient) {

  }

  salvar(loja: Loja) {

    if (loja.id == null) {
      return this.http.post<any>(`${environment.apiUrl}/loja/`, loja)
        .pipe(map(u => {
            return loja;
          }
        ));
    } else {
      return this.http.put<any>(`${environment.apiUrl}/loja/${loja.id}`, loja)
        .pipe(map(u => {
            return loja;
          }
        ));
    }
  }

  consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

    return this.http.get<any>(`${environment.apiUrl}/loja/dataTable?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

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

    return this.http.get<any>(`${environment.apiUrl}/loja/select?pesquisa=${pesquisa}`);
  }

  consultarPorId(id: any): Observable<Loja> {

    return this.http.get<any>(`${environment.apiUrl}/loja/${id}`);
  }

  excluir(id: number): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/loja/${id}`);
  }
}
