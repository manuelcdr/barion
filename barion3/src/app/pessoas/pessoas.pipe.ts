import { Pipe, PipeTransform } from '@angular/core';
import { Pessoa, PessoasPropriedades } from "./pessoa";
import { PessoaFiltro } from "./pessoas.component";
import { ITagFiltro } from "./tags";

@Pipe({
    name: 'filtroPessoas'
})
export class PessoasPipe implements PipeTransform {
    transform(pessoas: Pessoa[], filtro: PessoaFiltro) {

        if (filtro.filtros.length <= 0)
            return new Array<Pessoa>();

        let ids: number[] = [];

        pessoas.forEach(pessoa => {

            let temTodosFiltros = true;
            let temAlgumFiltro = false;

            let combinaProxFiltro = false;
            let tagRef: ITagFiltro;

            filtro.filtros.forEach(tagFiltro => {

                let temNaPessoa = false;

                if (combinaProxFiltro) {
                    console.log('combinou');
                    console.log(tagFiltro.valor);
                    tagRef.valor = tagFiltro.valor;

                    if (tagRef.Run(pessoa)) {
                        temNaPessoa = true;
                    }

                    combinaProxFiltro = false;
                    tagRef = null;
                }

                else if (tagFiltro.combinaProximoFiltro) {
                    console.log('combina');
                    combinaProxFiltro = true;
                    tagRef = tagFiltro;
                }

                else {
                    if (tagFiltro.Run(pessoa)) {
                        temNaPessoa = true;
                    }
                }

                if (!combinaProxFiltro) {
                    if (temNaPessoa) {
                        temAlgumFiltro = true;
                    }
                    if (!temNaPessoa) {
                        temTodosFiltros = false;
                    }
                }

            });

            if (filtro.validarTodos && temTodosFiltros) {
                ids.push(pessoa.id);
            } else if (!filtro.validarTodos && temAlgumFiltro) {
                ids.push(pessoa.id);
            }

        });

        let pessoasFiltradas = pessoas.filter(pessoa => ids.indexOf(pessoa.id) >= 0);

        return pessoasFiltradas;

    }
}
