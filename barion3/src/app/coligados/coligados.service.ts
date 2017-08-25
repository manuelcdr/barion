import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpService } from "../global/http.service";
import { Coligado } from "./coligado";

@Injectable()
export class ColigadosService extends HttpService<Coligado> {

  constructor(http: Http) {
    super(http, '/coligados');
  }

}
