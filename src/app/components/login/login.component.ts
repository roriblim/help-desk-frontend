import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '', senha:''
  }

  emailControl = new FormControl(null,Validators.email); 
  //vai validar se o e-mail fornecido é um e-mail válido
  senhaControl = new FormControl(null,Validators.minLength(3));

  constructor(
    private toastr: ToastrService,
    private service: AuthService)
  { }

  ngOnInit(): void {
  }

  logar(){
    this.service.authenticate(this.creds) //vou enviar as credenciais para fazer login
        .subscribe(
          resposta => {
            this.toastr.info(resposta.headers.get('Authorization'));
            },
          () => {
            this.toastr.error('Usuário e/ou senha inválidos');
           }
        )  //além de enviar as credenciais, vou subscribe para aguardar a resposta (quero o token)
  }

  validaCampos():boolean {
    return this.emailControl.valid && this.senhaControl.valid;
  }
}
