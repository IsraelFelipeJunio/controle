import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CentroCusto} from '../model/centro-custo';
import {DataTable} from '../model/data-table';

@Injectable({providedIn: 'root'})
export class CentroCustoService {

  constructor(private http: HttpClient) {

  }

  salvar(centroCusto: CentroCusto) {

    if (centroCusto.id == null) {
      return this.http.post<any>(`${environment.apiUrl}/centroCusto/`, centroCusto)
        .pipe(map(u => {
            return centroCusto;
          }
        ));
    } else {
      return this.http.put<any>(`${environment.apiUrl}/centroCusto/${centroCusto.id}`, centroCusto)
        .pipe(map(u => {
            return centroCusto;
          }
        ));
    }
  }

  consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

    return this.http.get<any>(`${environment.apiUrl}/centroCusto/dataTable?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

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

    return this.http.get<any>(`${environment.apiUrl}/centroCusto/select?pesquisa=${pesquisa}`);
  }

  consultarPorId(id: any): Observable<CentroCusto> {

    return this.http.get<any>(`${environment.apiUrl}/centroCusto/${id}`);
  }

  excluir(id: number): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/centroCusto/${id}`);
  }
}
