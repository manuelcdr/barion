import { Pipe } from '@angular/core';
import { Pessoa } from "./pessoa/pessoa.component";
import { FiltroSimplesPipe } from "../global/filtroSimples.pipe";

@Pipe({
  name: 'filtroPessoas'
})
export class PessoasPipe extends FiltroSimplesPipe<Pessoa> {
    
    retornaTextoDeComparacaoDoObjeto(obj: Pessoa): string {
        throw new Error("Method not implemented.");
    }

}
