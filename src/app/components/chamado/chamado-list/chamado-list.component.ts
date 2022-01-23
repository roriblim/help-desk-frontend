import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];  

  displayedColumns: string[] = ['a', 'b', 'c', 'd','e', 'f','g','acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  statusForm: FormGroup;

  constructor(private service:ChamadoService, fb: FormBuilder) {
    this.statusForm = fb.group({
      0: true,
      1: true,
      2: true,
    });
   }

  ngOnInit(): void {
    this.findAll();
  }

  findAll():void {
    this.service.findAll().subscribe(resposta =>{
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
      this.dataSource.paginator=this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(status: any):string{
    if (status=='0'){
      return 'ABERTO';
    } else if (status=='1'){
      return 'EM ANDAMENTO';
    } else
    {return 'ENCERRADO';}
  }

  retornaPrioridade(prioridade: any):string{
    if (prioridade=='0'){
      return 'BAIXA';
    } else if (prioridade=='1'){
      return 'MÉDIA';
    } else
    {return 'ALTA';}
  }


  onChange(e) {
    let list:Chamado[]=[];
    console.log(this.statusForm)
    this.ELEMENT_DATA.forEach(element =>{
      console.log(this.statusForm[element.status])
      if(this.statusForm.value[element.status]){
        list.push(element)
      }
    })
    this.FILTERED_DATA=list;
    this.dataSource = new MatTableDataSource<Chamado>(this.FILTERED_DATA);
    this.dataSource.paginator=this.paginator;
  }

}
