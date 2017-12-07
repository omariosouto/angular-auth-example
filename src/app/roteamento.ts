import { RouterModule, Routes } from '@angular/router'
import { ListagemComponent } from './listagem/listagem.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { LogoutComponent } from './logout/logout.component';


const rotasDaApp: Routes = [
  { path: 'listagem', component: ListagemComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: Page404Component }
]

export const roteamento = RouterModule.forRoot(rotasDaApp)
