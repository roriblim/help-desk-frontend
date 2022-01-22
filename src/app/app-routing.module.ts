import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  //note que login não é filha do navcomponent, pois o menu não deve aparecer na tela de login!
  {
    //o AuthGuard que vai dizer se eu posso acessar essas rotas daqui:
    path:'', component: NavComponent, canActivate:[AuthGuard], children:[
      {path:'home', component: HomeComponent},
      
      {path:'tecnicos',component:TecnicoListComponent},
      {path:'tecnicos/create',component:TecnicoCreateComponent},
      {path:'tecnicos/update/:id',component:TecnicoUpdateComponent},
      {path:'tecnicos/delete/:id',component:TecnicoDeleteComponent},

      {path:'clientes',component:ClienteListComponent},
      {path:'clientes/create',component:ClienteCreateComponent},
      {path:'clientes/update/:id',component:ClienteUpdateComponent},
      {path:'clientes/delete/:id',component:ClienteDeleteComponent}
    ]

    /*vamos colocar a rota de home como filha da rota de navcomponent, a fim de que 
    o router-outlet utilizado seja o de navcomponent. Se não houver router-outlet em navcomponent, 
    e eu tentar acessar home, home não vai aparecer.
     */
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
