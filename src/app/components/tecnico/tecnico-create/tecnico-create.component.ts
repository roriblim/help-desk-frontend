import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, Validators } from '@angular/forms';
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
  tecnico: Tecnico = {id:'',nome:'',cpf:'',email:'',senha:'',perfis:[],dataCriacao:''};
  selectedPerf=[{selected: false, label: 'Admin', cod:0}, {selected: false, label: 'Cliente',cod:1}, {selected: true, label: 'Técnico',cod:2}];

  constructor(
    private tecService: TecnicoService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  
  create():void{
    this.selectedPerf.forEach(item => {
     if (item.selected) {this.tecnico.perfis.push(item.cod);}
    })
    
    console.log(this.tecnico.perfis);
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

    onChange(e, item) {
      //alert(e.checked);
      this.selectedPerf[item.cod].selected = e.checked;
      //console.log(this.selectedPerf);
    }
    
    
    validaCampos():boolean{
      return this.nomeControl.valid &&
              this.cpfControl.valid &&
              this.emailControl.valid &&
              this.senhaControl.valid;
    }

}
