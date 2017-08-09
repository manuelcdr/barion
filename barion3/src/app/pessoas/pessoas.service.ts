import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Pessoa } from "./pessoa/pessoa.component";

@Injectable()
export class PessoasService {

  http: Http;
  headers: Headers;
  url: string;

  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-type', 'application/json');
    this.url = 'http://localhost:4500/api/pessoas';
  }

  lista(): Observable<Pessoa[]> {
    return this.http
      .get(this.url)
      .map(res => res.json());
  }

  cadastra(coligado: Pessoa): Observable<any> {
    if (coligado.id > 0) {
      return this.http
        .put(`${this.url}/${coligado.id}`, JSON.stringify(coligado), { headers: this.headers })
        .map(() => ({msg : 'Coligado atualizado com sucesso', alterado : true}));
    }
    return this.http
      .post(this.url, JSON.stringify(coligado), { headers: this.headers })
      .map(() => ({ msg : 'Coligado cadastrado com sucesso', alterado : false }));
  }

  buscaPorId(id: string): Observable<Pessoa> {
    let url = `${this.url}/${id}`;
    return this.http
      .get(`${this.url}/${id}`)
      .map(res => res.json());
  }

}
