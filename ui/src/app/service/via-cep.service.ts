import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ViaCepService {

    constructor(private http: HttpClient) {

    }

    consultarCep(cep: string): Observable<any> {

        return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
    }
}
