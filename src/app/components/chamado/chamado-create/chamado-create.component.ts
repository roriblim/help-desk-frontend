import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  clientes: Cliente[]=[];
  tecnicos: Tecnico[]=[];
  chamado: Chamado={
    prioridade: '',
    status:'',
    titulo:'',
    observacoes:'',
    tecnico:'',
    cliente:'',
    nomeCliente:'',
    nomeTecnico:''
  }

  prioridadeControl: FormControl = new FormControl(null, [Validators.required])
  statusControl: FormControl = new FormControl(null, [Validators.required])
  tituloControl: FormControl = new FormControl(null, [Validators.required])
  observacoesControl: FormControl = new FormControl(null, [Validators.required])
  tecnicoControl: FormControl = new FormControl(null, [Validators.required])
  clienteControl: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private chamadoService: ChamadoService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
  }
  create():void{
    this.chamadoService.create(this.chamado).subscribe(resposta =>{
        this.toastrService.success('Chamado criado com sucesso!','Novo chamado');
        this.router.navigate(['chamados']) //em caso de sucesso, vai voltar para a página que lista os chamados
    },
    ex=>{
      this.toastrService.error('ex.error.error')
    }
    )
  }

  findAllClientes():void{
    this.clienteService.findAll().subscribe(
      resposta =>{
        this.clientes=resposta;
      }
    )
  }

  findAllTecnicos():void{
    this.tecnicoService.findAll().subscribe(
      resposta =>{
        this.tecnicos=resposta;
      }
    )
  }

  validaCampos():boolean{
    return this.prioridadeControl.valid &&
           this.statusControl.valid &&
           this.tituloControl.valid &&
           this.observacoesControl.valid &&
           this.tecnicoControl.valid &&
           this.clienteControl.valid;
  }

}
