import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Cliente} from '../model/cliente';
import {DataTable} from '../model/data-table';

@Injectable({providedIn: 'root'})
export class ClienteService {

    constructor(private http: HttpClient) {

    }

    salvar(cliente: Cliente) {

        if (cliente.id == null) {
            return this.http.post<any>(`${environment.apiUrl}/cliente/`, cliente)
                .pipe(map(u => {
                        return cliente;
                    }
                ));
        } else {
            return this.http.put<any>(`${environment.apiUrl}/cliente/${cliente.id}`, cliente)
                .pipe(map(u => {
                        return cliente;
                    }
                ));
        }
    }

    consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

        return this.http.get<any>(`${environment.apiUrl}/cliente/dataTable?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

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

        return this.http.get<any>(`${environment.apiUrl}/cliente/select?pesquisa=${pesquisa}`);
    }

    consultarPorId(id: any): Observable<Cliente> {

        return this.http.get<any>(`${environment.apiUrl}/cliente/${id}`);
    }

    excluir(id: number): Observable<any> {

        return this.http.delete<any>(`${environment.apiUrl}/cliente/${id}`);
    }
}
