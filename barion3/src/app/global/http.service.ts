import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService<T> implements IHttpService<T> {
  
  http: Http;
  headers: Headers;
  url: string;

  constructor(http: Http, url: string = '') {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-type', 'application/json');
    this.url = 'http://localhost:4500/api' + url;
  }

  buscaPorId(id: string): Observable<T> {
    let url = `${this.url}/${id}`;
    return this.http
      .get(url)
      .map(res => res.json());
  }

  atualizaCadastra(obj: T): Observable<HttpResponseMessage> {
    let obj2 = (<any>obj);
    
    if (obj2.id > 0) {
      return this.http
        .put(`${this.url}/${obj2.id}`, JSON.stringify(obj2), { headers: this.headers })
        .map(() => new HttpResponseMessage('Coligado atualizado com sucesso', true, 'PUT'));
    }

    return this.http
      .post(this.url, JSON.stringify(obj2), { headers: this.headers })
      .map(() => new HttpResponseMessage('Coligado cadastrado com sucesso', true, 'POST'));
  }

  todos(): Observable<T[]> {
    return this.http
      .get(this.url)
      .map(res => res.json());
  }

  remove(id: string): Observable<HttpResponseMessage> {
    return this.http
      .delete(`${this.url}/${id}`)
      .map(res => new HttpResponseMessage('objeto deletado', true, 'DELETE'));
  }

  buscaPropriedades() : Observable<string[]> {
    return this.http
      .get(this.url + "/propriedades")
      .map(res => res.json());
  }

}


export interface IHttpService<T> {

  buscaPorId(id: string): Observable<T>;
  atualizaCadastra(obj: T): Observable<HttpResponseMessage>;
  todos(): Observable<T[]>;
  remove(id: string): Observable<HttpResponseMessage>;

}

export class HttpResponseMessage {
  msg: string;
  success: boolean;
  method: string;

  constructor(msg: string, success: boolean, method: string) {
    this.msg = msg;
    this.success = success;
    this.method = method;
  }
}