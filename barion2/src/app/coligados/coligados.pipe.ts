import { Pipe, PipeTransform } from '@angular/core';
import { Coligado } from "./coligado/coligado.component";

@Pipe({
  name: 'filtroColigados'
})
export class ColigadosPipe implements PipeTransform {

  transform(coligados : Coligado[], filtro : string) {
        filtro = filtro.toLowerCase().trim();
        
        if (filtro == '') 
            return coligados;

        return coligados.filter(coligado => coligado.nome.toLowerCase().includes(filtro));
    }

}
