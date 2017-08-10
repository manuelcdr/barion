import { PipeTransform } from '@angular/core';

export abstract class FiltroSimplesPipe<T> implements PipeTransform {

  transform(objs: T[], filtro: string) {
    filtro = filtro.toLowerCase().trim();

    if (filtro == '')
      return objs;

    return objs.filter(obj => this.retornaTextoDeComparacaoDoObjeto(obj).toLowerCase().includes(filtro));
  }

  abstract retornaTextoDeComparacaoDoObjeto(obj : T) : string;

}
