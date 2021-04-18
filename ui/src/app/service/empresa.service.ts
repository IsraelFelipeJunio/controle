import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Empresa} from '../model/empresa';
import {DataTable} from '../model/data-table';

@Injectable({providedIn: 'root'})
export class EmpresaService {

  constructor(private http: HttpClient) {

  }

  salvar(empresa: Empresa) {

    if (empresa.id == null) {
      return this.http.post<any>(`${environment.apiUrl}/empresa/`, empresa)
        .pipe(map(u => {
            return empresa;
          }
        ));
    } else {
      return this.http.put<any>(`${environment.apiUrl}/empresa/${empresa.id}`, empresa)
        .pipe(map(u => {
            return empresa;
          }
        ));
    }
  }

  consultarDataTable(page: number, pesquisa: string): Observable<DataTable> {

    return this.http.get<any>(`${environment.apiUrl}/empresa/dataTable?pesquisa=${pesquisa}&page=${page}&pageSize=10`).pipe(map(dt => {

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

    return this.http.get<any>(`${environment.apiUrl}/empresa/select?pesquisa=${pesquisa}`);
  }

  consultarEmpresaPai(pesquisa: any, empresaId: number): Observable<any> {
    
    return empresaId != null ?
           this.http.get<any>(`${environment.apiUrl}/empresa/consultarEmpresaPai?pesquisa=${pesquisa}&empresaId=${empresaId}`) :
           this.http.get<any>(`${environment.apiUrl}/empresa/select?pesquisa=${pesquisa}`);
  }

  consultarPorId(id: any): Observable<Empresa> {

    return this.http.get<any>(`${environment.apiUrl}/empresa/${id}`);
  }

  excluir(id: number): Observable<any> {

    return this.http.delete<any>(`${environment.apiUrl}/empresa/${id}`);
  }
}
