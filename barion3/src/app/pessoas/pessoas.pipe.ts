import { Pipe } from '@angular/core';
import { FiltroSimplesPipe } from "../global/filtroSimples.pipe";
import { Pessoa } from "./pessoa";

@Pipe({
  name: 'filtroPessoas'
})
export class PessoasPipe extends FiltroSimplesPipe<Pessoa> {
    
    retornaTextoDeComparacaoDoObjeto(obj: Pessoa): string {
        throw new Error("Method not implemented.");
    }

}
