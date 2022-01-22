import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  nomeControl: FormControl = new FormControl(null, [Validators.minLength(3), Validators.maxLength(50)]);
  cpfControl: FormControl = new FormControl(null, Validators.required);
  emailControl: FormControl = new FormControl(null, Validators.email);
  senhaControl: FormControl = new FormControl(null, Validators.minLength(3));
  cliente: Cliente = {id:'',nome:'',cpf:'',email:'',senha:'',perfis:[],dataCriacao:''};
  selectedPerf=[{selected: false, label: 'Admin', cod:0}, {selected: true, label: 'Cliente',cod:1}, {selected: false, label: 'Técnico',cod:2}];

  constructor(
    private tecService: ClienteService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  
  create():void{
    this.selectedPerf.forEach(item => {
     if (item.selected) {this.cliente.perfis.push(item.cod);}
    })
    
    console.log(this.cliente.perfis);
    this.tecService.create(this.cliente).subscribe(
      resposta => { //note ainda que, como eu não estou utilizando a resposta no código, posso substitui-la por ()
        this.toastr.success('Cliente cadastrado com sucesso!','Cadastro');
        this.router.navigate(['clientes']);
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
