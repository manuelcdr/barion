import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from "../global/http.service";
import { Pessoa } from "./pessoa";

@Injectable()
export class PessoasService extends HttpService<Pessoa> {

  constructor(http: Http) {
    super(http, '/pessoas');
  }

}
