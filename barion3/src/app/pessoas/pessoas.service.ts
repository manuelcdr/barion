import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService, HttpResponseMessage } from "../global/http.service";
import { Pessoa, PropriedadeComNome } from "./pessoa";

@Injectable()
export class PessoasService extends HttpService<Pessoa> {

  constructor(http: Http) {
    super(http, '/pessoas');
  }

  salvarImagens(id: number, fotoRosto: any = null, fotoCorpo1: any = null, fotoCorpo2: any = null): Observable<HttpResponseMessage> {
    let formData = new FormData();

    let fileNames = {};

    let fileNameRosto = this.addFileFormBase(formData, id, fotoRosto, "fotoRosto");
    let fileNameCorpo1 = this.addFileFormBase(formData, id, fotoCorpo1, "fotoCorpo1");
    let fileNameCorpo2 = this.addFileFormBase(formData, id, fotoCorpo2, "fotoCorpo2");

    fileNames = {
      fotoRosto : fileNameRosto,
      fotoCorpo1 : fileNameCorpo1,
      fotoCorpo2 : fileNameCorpo2
    };

    let url = `${this.url}/${id.toString()}/images`;
    console.log(url);

    return this.http
      .post(url, formData)
      .map(retorno => new HttpResponseMessage('Fotos salvas com sucesso', true, 'POST', { retorno, fileNames }));
  }

  private addFileFormBase(formData: FormData, id: number, fileBase: any, fileNameComplemento: string) : string {
    if (fileBase && fileBase.files.length > 0) {
      let file = fileBase.files[0];
      let fileName = this.montaFileName(id, file, fileNameComplemento);
      formData.append(fileName, file, file.name);
      return fileName;
    }
    return "";
  }

  private montaFileName(id: number, file: File, fileNameComplemento: string): string {
    let data = new Date();
    let fb = data.getDay() + data.getMonth() + data.getFullYear() + data.getMilliseconds();
    let fileNameBase = `${fb.toString()}-${id.toString()}-`;
    let tipoArquivo = (<string>file.name).split(".").pop();
    let fileName = `${fileNameBase}-${fileNameComplemento}.${tipoArquivo}`;
    return fileName;
  }

  buscaPropriedades(): Observable<any> {
    console.log(this.url + "/propriedades");
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
