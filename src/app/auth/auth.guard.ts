import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){

  }

  //sempre que houver uma requisição para alguma das rotas da aplicação, o método canActivate será chamado.
  //se o return for true, o acesso solicitado será permitido. 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let authenticated = this.authService.isAuthenticated();

    if(authenticated){
      return true; //se retorna true, o acesso solicitado será permitido
    } else{
      this.router.navigate(['login']);
      return false; //vai dizer que, por padrão, não será possível acessar aos recursos
    }

    

  }
  
}
