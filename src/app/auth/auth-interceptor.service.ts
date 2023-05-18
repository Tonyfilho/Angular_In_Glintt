import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, exhaustMap } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * 1º esta é um classe de Interceptor onde não itemos por o @Injectable()  como ROOT
 * 2º implementar a HttpIterceptor e retornar
 * 3º o nosso requesti será no TOKEN
 * 4º Agora o Interceptor irá adcionar o >Token em todos os nossos requests
 * 5º Como é um serviço  que não é ROOT temos que adcionar no Array de provider no compomente pai AppModule
 * providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
 * 6º caso não haja user, retornaremos o request ooriginal, e com isto conseguiremos autenticar
 *
 *
 */
@Injectable(
)
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return this.auth.localUserLogin.pipe(
    take(1),
    exhaustMap(user => {
      if (!user) {
           return next.handle(req);
      }
      /**Clonando o request , pois original não pode ser SETADO, é IMUTÁVEL */
      const modifiedRequest = req.clone(
        {
          params: new HttpParams().set('auth', user.token)
        }
      );
      return next.handle(modifiedRequest);

    })

   )

  }
}
