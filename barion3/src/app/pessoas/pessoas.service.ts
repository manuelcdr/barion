import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService, HttpResponseMessage } from "../global/http.service";
import { Pessoa, PropriedadeComNome } from "./pessoa";
import { AppGlobals } from "../global/global";

@Injectable()
export class PessoasService extends HttpService<Pessoa> {

  constructor(http: Http, globals: AppGlobals) {
    super(http, '/pessoas', globals);
  }

  salvarImagens(id: number, fotoRosto: any = null, fotoCorpo1: any = null, fotoCorpo2: any = null): Observable<HttpResponseMessage> {
    let formData = new FormData();

    if (fotoRosto && fotoRosto.files.length > 0) {
      var file = fotoRosto.files[0];
      formData.append(this.montaFileName(file, "rosto"), file, file.name);
    }
    if (fotoCorpo1 && fotoCorpo1.files.length > 0) {
      var file = fotoCorpo1.files[0];
      formData.append(this.montaFileName(file, "corpo1"), file, file.name);
    }
    if (fotoCorpo2 && fotoCorpo2.files.length > 0) {
      var file = fotoCorpo2.files[0];
      formData.append(this.montaFileName(file, "corpo2"), file, file.name);
    }

    let url = `${this.url}/${id.toString()}/images`;

    let returnHttp =  this.http
      .post(url, formData, { headers : new Headers() })
      .map(retorno => new HttpResponseMessage('Fotos salvas com sucesso', true, 'POST', { retorno }));
    
      return returnHttp;
  }

  private montaFileName(file: File, fileNameComplemento: string): string {
    return fileNameComplemento + '-' + file.name;
  }

  buscaPropriedades(): Observable<{ todasPropriedades: string[], porNome: PropriedadeComNome[] }> {
    return this.http
      .get(this.url + "/propriedades")
      .map(res => res.json());
  }

  buscaPropriedadesSemNome(): Observable<string[]> {
    return this.buscaPropriedades().map(res => res.todasPropriedades);
  }

  buscaPropriedadesComNome(): Observable<PropriedadeComNome[]> {
    return this.buscaPropriedades().map(res => res.porNome);
  }

}
