import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Credenciais } from '../models/credenciais';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(creds:Credenciais){
    return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {observe: 'response', responseType: `text` });
    //ao mesmo tempo que vou enviar as credenciais, vou aguardar como resposta o token (observe response)
  }

  successfulLogin(authToken: string){
    localStorage.setItem('token',authToken);
  }
}
