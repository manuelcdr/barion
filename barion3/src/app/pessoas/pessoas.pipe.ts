import { Pipe, PipeTransform } from '@angular/core';
import { Pessoa } from "./pessoa/pessoa.component";

@Pipe({
  name: 'filtroPessoas'
})
export class PessoasPipe implements PipeTransform {

  transform(pessoas : Pessoa[], filtro : string) {
        filtro = filtro.toLowerCase().trim();
        
        if (filtro == '') 
            return pessoas;

        return pessoas.filter(pessoa => pessoa.nome.toLowerCase().includes(filtro));
    }

}
