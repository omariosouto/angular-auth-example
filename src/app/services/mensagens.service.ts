import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class MensagensService {
  URL: string = 'http://localhost:4001/mensagens'
  token: string

  constructor(private http: Http) {
    this.token = localStorage.getItem('AUTH-TOKEN')
  }

  getAll() {
    return this.http.get(`${this.URL}/?auth-token=${localStorage.getItem('AUTH-TOKEN')}`)
  }
}
