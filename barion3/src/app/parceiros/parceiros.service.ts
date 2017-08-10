import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpService } from "../global/http.service";
import { Parceiro } from "./parceiro";

@Injectable()
export class ParceirosService extends HttpService<Parceiro> {

  constructor(http: Http) {
    super(http, '/parceiros');
  }

}

