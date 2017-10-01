import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpService } from "../global/http.service";
import { Coligado } from "./coligado";
import { AppGlobals } from "../global/global";

@Injectable()
export class ColigadosService extends HttpService<Coligado> {

  constructor(http: Http, globals: AppGlobals) {
    super(http, '/coligados', globals);
  }

}
