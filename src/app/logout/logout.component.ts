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
