import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = [ ];  
  displayedColumns: string[] = ['a', 'b', 'c', 'd','acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private service: TecnicoService
    ) {}


  ngOnInit(): void {
    this.findAll();
  }
  
  ngAfterViewInit() {
    
  }

  findAll(){
    this.service.findAll().subscribe(resposta =>
     { this.ELEMENT_DATA= resposta;
      this.dataSource = new MatTableDataSource<Tecnico>(resposta)
      this.dataSource.paginator = this.paginator; 
      //******devemos iniciar o paginator depois que os dados forem carregados!!!******
    })
  }
}


