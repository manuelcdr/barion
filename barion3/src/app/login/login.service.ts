import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs";
import { HttpResponseMessage } from "../global/http.service";

@Injectable()
export class LoginService {

  http: Http;
  headers: Headers;
  url: string;

  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-type', 'application/json');
    this.url = 'http://localhost:4500/auth/login';
  }

  login(login: string, senha : string) : Observable<HttpResponseMessage> {
    let user = {
      login : login,
      senha : senha
    };
    
    return this.http
    .post(this.url, JSON.stringify(user), { headers: this.headers })
    .map(retorno => new HttpResponseMessage('Cadastro realizado', true, 'POST', retorno.text()));
  }

}