import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  //note que login não é filha do navcomponent, pois o menu não deve aparecer na tela de login!
  {
    //o AuthGuard que vai dizer se eu posso acessar essas rotas daqui:
    path:'', component: NavComponent, canActivate:[AuthGuard], children:[
      {path:'home', component: HomeComponent},
      {path:'tecnicos',component:TecnicoListComponent},
      {path:'tecnicos/create',component:TecnicoCreateComponent}
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
