import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/credenciais';

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

  constructor() { }

  ngOnInit(): void {
  }

  validaCampos():boolean {
    if (this.emailControl.valid && this.senhaControl.valid){
      return true;
    } else{
      return false;
    }
    
  }
}
