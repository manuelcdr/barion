import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Pessoa } from "./pessoa/pessoa.component";
import { HttpService } from "../global/http.service";

@Injectable()
export class PessoasService extends HttpService<Pessoa> {

  constructor(http: Http) {
    super(http, '/pessoas');
  }

}
