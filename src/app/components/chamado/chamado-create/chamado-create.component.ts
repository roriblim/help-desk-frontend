import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {


  prioridadeControl: FormControl = new FormControl(null, [Validators.required])
  statusControl: FormControl = new FormControl(null, [Validators.required])
  tituloControl: FormControl = new FormControl(null, [Validators.required])
  descricaoControl: FormControl = new FormControl(null, [Validators.required])
  tecnicoControl: FormControl = new FormControl(null, [Validators.required])
  clienteControl: FormControl = new FormControl(null, [Validators.required])

  constructor() { }

  ngOnInit(): void {
  }

  validaCampos():boolean{
    return this.prioridadeControl.valid &&
           this.statusControl.valid &&
           this.tituloControl.valid &&
           this.descricaoControl.valid &&
           this.tecnicoControl.valid &&
           this.clienteControl.valid;
  }

}
