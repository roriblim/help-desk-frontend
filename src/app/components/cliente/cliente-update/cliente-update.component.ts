
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  nomeControl: FormControl = new FormControl(null, [Validators.minLength(3), Validators.maxLength(50)]);
  cpfControl: FormControl = new FormControl(null, Validators.required);
  emailControl: FormControl = new FormControl(null, Validators.email);
  senhaControl: FormControl = new FormControl(null, Validators.minLength(3));
  cliente: Cliente = {id:'',nome:'',cpf:'',email:'',senha:'',perfis:[],dataCriacao:''};
  selectedPerf=[{selected: false, label: 'Admin', cod:0}, {selected: false, label: 'Cliente',cod:1}, {selected: false, label: 'Técnico',cod:2}];


  constructor(
    private tecService: ClienteService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { } //o ActivatedRoute permite que a gente pegue parâmetros da URL

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id'); 
    //ele vai reconhecer o id porque é o mesmo parâmetro informado no app-routing.module
    this.findById();
  }

  findById(): void{
    this.tecService.findById(this.cliente.id).subscribe( 
      resposta => {
        this.cliente=resposta
        console.log(this.cliente.perfis);
        this.cliente.perfis.forEach(item=>{
          this.selectedPerf[item].selected=true;
        })
        console.log(this.selectedPerf);
      })
  }
  
  update():void{
    this.cliente.perfis=[]
    this.selectedPerf.forEach(item => {
      if (item.selected) {this.cliente.perfis.push(item.cod);}
     })
    this.tecService.update(this.cliente).subscribe(
      resposta => { //note ainda que, como eu não estou utilizando a resposta no código, posso substitui-la por ()
        this.toastr.success('Cliente atualizado com sucesso!','Atualização');
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
