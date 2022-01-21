import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  nomeControl: FormControl = new FormControl(null, [Validators.minLength(3), Validators.maxLength(50)]);
  cpfControl: FormControl = new FormControl(null, Validators.required);
  emailControl: FormControl = new FormControl(null, Validators.email);
  senhaControl: FormControl = new FormControl(null, Validators.minLength(3));
  tecnico: Tecnico = {id:'',nome:'',cpf:'',email:'',senha:'',perfis:[2],dataCriacao:''};
  //botei para começar com o perfil 2, pois a checkbox de tecnico já inicia marcada

  constructor(
    private tecService: TecnicoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { } //o ActivatedRoute permite que a gente pegue parâmetros da URL

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id'); 
    //ele vai reconhecer o id porque é o mesmo parâmetro informado no app-routing.module
    this.findById();
  }

  findById(): void{
    this.tecService.findById(this.tecnico.id).subscribe( resposta =>
      this.tecnico=resposta)
  }
  
  update():void{
    this.tecService.update(this.tecnico).subscribe(
      resposta => { //note ainda que, como eu não estou utilizando a resposta no código, posso substitui-la por ()
        this.toastr.success('Técnico atualizado com sucesso!','Atualização');
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
