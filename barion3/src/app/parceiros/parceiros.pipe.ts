import { Pipe } from '@angular/core';
import { FiltroSimplesPipe } from "../global/filtroSimples.pipe";
import { Parceiro } from "./parceiro";

@Pipe({
  name: 'filtroParceiros'
})
export class ParceirosPipe extends FiltroSimplesPipe<Parceiro> {
  
  retornaTextoDeComparacaoDoObjeto(obj: Parceiro): string {
    return obj.nome;
  }

}
