import { Pipe, PipeTransform } from '@angular/core';
import { Coligado } from "./coligado/coligado.component";
import { FiltroSimplesPipe } from "../global/filtroSimples.pipe";

@Pipe({
  name: 'filtroColigados'
})
export class ColigadosPipe extends FiltroSimplesPipe<Coligado> {
    
    retornaTextoDeComparacaoDoObjeto(obj: Coligado): string {
        return obj.nome;
    }

}
