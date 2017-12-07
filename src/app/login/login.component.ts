import { Component } from '@angular/core';
import { Usuario } from '../usuario/usuario.class'
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  usuario: Usuario = new Usuario()
  constructor(private http: Http, private router: Router) {
    this.usuario.login = 'teste' // Dados iniciais, pode remover
    this.usuario.senha = '123' // Dados iniciais, pode remover

    // Valida o Token: Existe, manda para a página inicial de logado
    if(localStorage.getItem('AUTH-TOKEN')) {
      console.log('Valida o Token: Existe, manda para a página inicial de logado')
      this.router.navigate(['/listagem'])
    }
  }

  logar(event: Event) {
    event.preventDefault()

    const cabecalho = new Headers()
    cabecalho.append('Content-Type', 'application/json')

    this.http.post(
      'http://localhost:4001/login',
      JSON.stringify(this.usuario),
      {
        headers: cabecalho
      }
    )
    .subscribe((resposta) => {
      const tokenDoUsuario = resposta.text()
      console.log(`O servidor nos devolveu o TOKEN: `)
      console.log(tokenDoUsuario)
      console.log(`Devemos salvar ele no localStorage`)
      // Salvando no localStorage
      localStorage.setItem('AUTH-TOKEN', tokenDoUsuario)
      // Manda o usuário para uma nova rota da aplicação
      this.router.navigate(['/listagem'])

    })
  }
}
