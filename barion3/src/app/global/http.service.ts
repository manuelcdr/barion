import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import * as configJson from 'assets/js/config.json';
import { AppGlobals } from "./global";
import { Loader } from "./helpers";
let config = (<any>configJson);

@Injectable()
export class HttpService<T> implements IHttpService<T> {
  
  http: Http;
  headers: Headers;
  url: string;
  globals : AppGlobals;

  constructor(http: Http, url: string = '', globals: AppGlobals) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-type', 'application/json');
    this.globals = globals;
    this.url = globals.urlApi + url;
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
        .map(() => new HttpResponseMessage('Dados atualizados', true, 'PUT', obj2.id));
    }

    return this.http
      .post(this.url, JSON.stringify(obj2), { headers: this.headers })
      .map(retorno => new HttpResponseMessage('Cadastro realizado', true, 'POST', retorno.text()));
  }

  todos(): Observable<T[]> {
    return this.http
      .get(this.url)
      .map(res => res.json());
  }

  remove(id: string): Observable<HttpResponseMessage> {
    return this.http
      .delete(`${this.url}/${id}`)
      .map(res => new HttpResponseMessage('Dados deletados', true, 'DELETE'));
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
  retornoObj : any;

  constructor(msg: string, success: boolean, method: string, retornoObj : any = null) {
    this.msg = msg;
    this.success = success;
    this.method = method;
    this.retornoObj = retornoObj;
  }
}