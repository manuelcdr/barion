import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpService } from "../global/http.service";
import { Parceiro } from "./parceiro";
import { AppGlobals } from "../global/global";

@Injectable()
export class ParceirosService extends HttpService<Parceiro> {

  constructor(http: Http, globals: AppGlobals) {
    super(http, '/parceiros', globals);
  }

}

