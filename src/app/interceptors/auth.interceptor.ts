import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    
    if (token){
      const cloneReq = request.clone({headers: request.headers.set('Authorization',`Bearer ${token}`)});
      return next.handle(cloneReq);
    } else{
      return next.handle(request);
    }
  }
}

  export const AuthInterceptorProvider = [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true 
      /*multi é necessário para informar ao Angular que o HTTP_INTERCEPTORS é um token para um multiprovedor
      que injeta uma matriz de valores, em vez de um valor único*/
    }
  ]

