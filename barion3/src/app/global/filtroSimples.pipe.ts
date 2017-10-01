import { PipeTransform } from '@angular/core';
import { Loader } from "./helpers";

export abstract class FiltroSimplesPipe<T> implements PipeTransform {

  transform(objs: T[], filtro: string) {
    filtro = filtro.toLowerCase().trim();

    Loader.showPipeLoader();

    if (filtro == '') {
      Loader.hidePipeLoader();
      return objs;
    }

    let returnObjs = objs.filter(obj => this.retornaTextoDeComparacaoDoObjeto(obj).toLowerCase().includes(filtro));

    Loader.hidePipeLoader();

    return returnObjs;
  }

  abstract retornaTextoDeComparacaoDoObjeto(obj : T) : string;

}
