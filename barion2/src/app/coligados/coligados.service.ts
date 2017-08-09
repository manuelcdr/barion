import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Coligado } from "./coligado/coligado.component";

@Injectable()
export class ColigadosService {

  http: Http;
  headers: Headers;
  url: string;

  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-type', 'application/json');
    this.url = 'http://localhost:4500/api/coligados';
  }

  lista(): Observable<Coligado[]> {
    return this.http
      .get(this.url)
      .map(res => res.json());
  }

  cadastra(coligado: Coligado): Observable<any> {

    console.log('cadastra coligado');
    console.log(coligado);
    if (coligado.id > 0) {
      return this.http
        .put(`${this.url}/${coligado.id}`, JSON.stringify(coligado), { headers: this.headers })
        .map(() => ({msg : 'Coligado atualizado com sucesso', alterado : false}));
    }
    return this.http
      .post(this.url, JSON.stringify(coligado), { headers: this.headers })
      .map(() => ({ msg : 'Coligado cadastrado com sucesso', alterado : true }));
  }

  buscaPorId(id: string): Observable<Coligado> {
    let url = `${this.url}/${id}`;
    return this.http
      .get(`${this.url}/${id}`)
      .map(res => res.json());
  }

}
