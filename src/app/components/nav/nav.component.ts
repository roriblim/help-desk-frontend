import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { } 
  //colocamos um router no construtor a fim de que, no ngoninit, a gente possa redirecionar para a 'home' 

  ngOnInit(): void {
    this.router.navigate(['home']);
  }

}
