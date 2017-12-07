import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensagensService } from '../services/mensagens.service';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html'
})
export class ListagemComponent {

  userInfo: Object = localStorage.getItem('USER_INFO')
  userToken: Object = localStorage.getItem('AUTH_TOKEN')
  mensagens: Array<Object> = []

  constructor(private router: Router, private msgService: MensagensService) {
    // Valida o Token: Não existe, manda pro login
    if(!localStorage.getItem('AUTH-TOKEN')) {
      console.log('Valida o Token: Não existe, manda pro login')
      this.router.navigate(['/'])
    }


    // Pegamos as mensagens, e atualizamos nossa lista
    msgService.getAll()
              .subscribe(
                (resposta) => {
                  const respostaEmJson = resposta.json()
                  this.mensagens = respostaEmJson
                }
              )
  }

}
