import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ProjetoFaseTarefa } from '../model/projeto-fase-tarefa';

@Injectable({providedIn: 'root'})
export class ProjetoFaseTarefaService {

    constructor(private http: HttpClient) { }

    salvar(projetoFaseTarefa: ProjetoFaseTarefa) {

        if (projetoFaseTarefa.id == null) {
            return this.http.post<any>(`${environment.apiUrl}/projetoFaseTarefa/`, projetoFaseTarefa)
                .pipe(map(u => {
                        return projetoFaseTarefa;
                    }
                ));
        } else {
            return this.http.put<any>(`${environment.apiUrl}/projetoFaseTarefa/${projetoFaseTarefa.id}`, projetoFaseTarefa)
                .pipe(map(u => {
                        return projetoFaseTarefa;
                    }
                ));
        }
    }

    consultarSelect(pesquisa: any): Observable<any> {

        return this.http.get<any>(`${environment.apiUrl}/projetoFaseTarefa/select?pesquisa=${pesquisa}`);
    }

    consultarSelectPorProjetoFase(pesquisa: any, projetoFaseId: number): Observable<any> {
    
        return projetoFaseId != null ?
               this.http.get<any>(`${environment.apiUrl}/projetoFaseTarefa/consultarFasePorProjetoFase?pesquisa=${pesquisa}&projetoFaseId=${projetoFaseId}`) :
               this.http.get<any>(`${environment.apiUrl}/projetoFaseTarefa/select?pesquisa=${pesquisa}`);
    }

    consultarSelectPorProjetoFasePai(pesquisa: any, projetoFaseId: number): Observable<any> {
    
        return projetoFaseId != null ?
               this.http.get<any>(`${environment.apiUrl}/projetoFaseTarefa/consultarProjetoFaseTarefaPai?pesquisa=${pesquisa}&projetoFaseId=${projetoFaseId}`) :
               this.http.get<any>(`${environment.apiUrl}/projetoFaseTarefa/select?pesquisa=${pesquisa}`);
    }

    consultarPorId(id: any): Observable<ProjetoFaseTarefa> {

        return this.http.get<any>(`${environment.apiUrl}/projetoFaseTarefa/${id}`);
    }

    excluir(id: number): Observable<any> {

        return this.http.delete<any>(`${environment.apiUrl}/projetoFaseTarefa/${id}`);
    }

    consultarPorProjetoFase(projetoFaseId: any): Observable<ProjetoFaseTarefa[]> {

        return this.http.get<any>(`${environment.apiUrl}/projetoFaseTarefa/consultarPorProjetoFase/${projetoFaseId}`);
    }

}
