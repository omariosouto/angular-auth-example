# Autenticação usando Angular: Exemplo
Exemplo com a **lógica necessária** para implementar uma autenticação utilizando o framework, mas a ideia serve para qualquer aplicação Front. 

## Página de [Login](https://github.com/omariosouto/angular-auth-example/blob/master/src/app/login/login.component.ts)
Para iniciar tudo suba o servidor com a API e com o Angular usando os comandos:

> npm install 

Depois que instalar tudo:

> node server.js

> ng serve --port 4000

Feito isso, abra o componente `/src/app/listagem/listagem.component.ts` e observe a lógica de funcionamento do componente a parte principal é:
```ts
    constructor() {
      // Valida o Token: Existe, manda para a página inicial de logado
      if(localStorage.getItem('AUTH-TOKEN')) {
        console.log('Valida o Token: Existe, manda para a página inicial de logado')
        this.router.navigate(['/listagem'])
      }
```

Quando o usuário fizer um login bem sucedido, salve o token que o servidor devolve da sua requisição no `localStorage` e redirecionamos o usuário para uma página interna

```ts
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
```
## Páginas [internas do Sistema](https://github.com/omariosouto/angular-auth-example/blob/master/src/app/listagem/listagem.component.ts)

Verifica se o token existe: 
```ts
  constructor() {
    // Valida o Token: Não existe, manda pra URL do login
    if(!localStorage.getItem('AUTH-TOKEN')) {
      console.log('Valida o Token: Não existe, manda pro login')
      this.router.navigate(['/'])
    }
```

Sempre que for fazer **QUALQUER** requisição que precise do token, devemos passar ele via **cabeçalho da requisição** (Headers) ou parametro na **URL**
```ts
this.http
    .get(`${this.URL}/?auth-token=${localStorage.getItem('AUTH-TOKEN')}`)
    .subscribe(
      (resposta) => {
        const respostaEmJson = resposta.json()
        this.mensagens = respostaEmJson
      }
    )
```

## Página de logout

Simplesmente, apagamos o token.

```ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: 'Fazendo logout...'
})
export class LogoutComponent {

  constructor(router: Router) {
    localStorage.setItem('AUTH-TOKEN', '')
    router.navigate([''])
  }

}

```


## Entendendo o back-end

Abra o arquivo com o [código do back-end](https://github.com/omariosouto/angular-auth-example/blob/master/server.js), e veja a lógica necessária para implementar em seu sistema, ou sua linguagem preferida.

> OBS: App.get e App.post, recebem uma URL que seria a rota, e na sequência uma função que é executada quando a chamada para a URL cadastrada acontecer 
