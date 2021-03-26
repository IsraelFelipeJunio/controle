import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Usuario} from '../model/usuario';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class AutenticacaoService {

  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient, private router: Router) {

    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuarioLogado')));

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get usuarioLogado(): Usuario {
    return this.currentUserSubject.getValue();
  }

  logar(email: string, senha: string) {

    return this.http.post<any>(`${environment.apiUrl}/authenticate`, {email, senha})
      .pipe(map(usuario => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        this.currentUserSubject.next(usuario);
        return usuario;
      }));
  }

  deslogar() {
    // remove user from local storage to log user out
    localStorage.removeItem('usuarioLogado');
    // this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
