import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';


@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {


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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById():void{
    this.chamadoService.findById(this.chamado.id).subscribe(resposta=>{
      this.chamado = resposta;
      this.chamado.tecnico=this.chamado.tecnico.toString();
      this.chamado.cliente=this.chamado.cliente.toString();
      this.chamado.prioridade =this.chamado.prioridade.toString();
      this.chamado.status =this.chamado.status.toString();
    },ex=>{
      this.toastrService.error('ex.error.error')
    }
    )
  }

  update():void{
    this.chamadoService.update(this.chamado).subscribe(resposta =>{
        this.toastrService.success('Chamado atualizado com sucesso!','Atualizando chamado');
        this.router.navigate(['chamados']) //em caso de sucesso, vai voltar para a página que lista os chamados
    },
    ex=>{
      this.toastrService.error('ex.error.error');
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
        
        this.tecnicos.forEach(tec => tec.id = tec.id.toString())
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
