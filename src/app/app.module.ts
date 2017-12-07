import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { ListagemComponent } from './listagem/listagem.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { LogoutComponent } from './logout/logout.component'

import { roteamento } from './roteamento';
import { MensagensService } from './services/mensagens.service'

@NgModule({
  declarations: [
    AppComponent,
    ListagemComponent,
    LoginComponent,
    Page404Component,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    roteamento,
    FormsModule,
    HttpModule
  ],
  providers: [ MensagensService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
