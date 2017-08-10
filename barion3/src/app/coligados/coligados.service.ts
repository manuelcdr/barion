import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Coligado } from "./coligado/coligado.component";
import { HttpService } from "../global/http.service";

@Injectable()
export class ColigadosService extends HttpService<Coligado> {

  constructor(http: Http) {
    super(http, '/coligados');
  }

}
