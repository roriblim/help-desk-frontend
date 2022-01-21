import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  nomeControl: FormControl = new FormControl(null, [Validators.minLength(3), Validators.maxLength(50)]);
  cpfControl: FormControl = new FormControl(null, Validators.required);
  emailControl: FormControl = new FormControl(null, Validators.email);
  senhaControl: FormControl = new FormControl(null, Validators.minLength(3));
  tecnico: Tecnico = {id:'',nome:'',cpf:'',email:'',senha:'',perfis:[2],dataCriacao:''};
  //botei para começar com o perfil 2, pois a checkbox de tecnico já inicia marcada

  constructor(
    private tecService: TecnicoService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  
  create():void{
    this.tecService.create(this.tecnico).subscribe(
      resposta => { //note ainda que, como eu não estou utilizando a resposta no código, posso substitui-la por ()
        this.toastr.success('Técnico cadastrado com sucesso!','Cadastro');
        this.router.navigate(['tecnicos']);
      },
      ex => {
        //console.log(ex);
        //caso haja uma exceção, o backend pode retornar um error ou um array de errors.
        if (ex.error.errors){
          ex.error.errors.forEach(element => {
            this.toastr.error(element.message);
          });
        }
        else{
          this.toastr.error(ex.error.message)
        }
      }
      )
    }

addPerfil(perfil:any):void{
  if (this.tecnico.perfis.includes(perfil)){
    //esta validação é para dizer que, se o perfil já está na lista, e ele clicou de novo, é porque ele quer tirar
    this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil),1);
  }
  else{
    this.tecnico.perfis.push(perfil);
  }
  //console.log(this.tecnico.perfis);
}
    
    
    validaCampos():boolean{
      return this.nomeControl.valid &&
              this.cpfControl.valid &&
              this.emailControl.valid &&
              this.senhaControl.valid;
    }

}
