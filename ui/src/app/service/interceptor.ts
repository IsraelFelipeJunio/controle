import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AutenticacaoService} from './autenticacao.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private authenticationService: AutenticacaoService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        const currentUser: any = this.authenticationService.usuarioLogado;

        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request).pipe(catchError(err => {

            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.deslogar();
            }

            // const error = err.error.message || err.statusText;
            return throwError(err);
        }));
    }
}
