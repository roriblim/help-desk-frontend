
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
  tecnico: Tecnico = {id:'',nome:'',cpf:'',email:'',senha:'',perfis:[],dataCriacao:''};
  selectedPerf=[{selected: false, label: 'Admin', cod:0}, {selected: false, label: 'Cliente',cod:1}, {selected: false, label: 'Técnico',cod:2}];


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
    this.tecService.findById(this.tecnico.id).subscribe( 
      resposta => {
        this.tecnico=resposta
        console.log(this.tecnico.perfis);
        this.tecnico.perfis.forEach(item=>{
          this.selectedPerf[item].selected=true;
        })
        console.log(this.selectedPerf);
      })
  }
  
  update():void{
    this.tecnico.perfis=[]
    this.selectedPerf.forEach(item => {
      if (item.selected) {this.tecnico.perfis.push(item.cod);}
     })
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
