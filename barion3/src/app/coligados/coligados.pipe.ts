import { Pipe, PipeTransform } from '@angular/core';
import { FiltroSimplesPipe } from "../global/filtroSimples.pipe";
import { Coligado } from "./coligado";

@Pipe({
    name: 'filtroColigados'
})
export class ColigadosPipe extends FiltroSimplesPipe<Coligado> {

    retornaTextoDeComparacaoDoObjeto(obj: Coligado): string {
        return obj.nome +
            obj.cidade +
            obj.estado;
    }

}
