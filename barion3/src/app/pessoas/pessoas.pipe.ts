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
            return pessoas;

        let ids: number[] = [];

        pessoas.forEach(pessoa => {

            let temTodosFiltros = true;
            let temAlgumFiltro = false;

            let combinaProxFiltro = false;
            let tagRef: ITagFiltro;

            filtro.filtros.forEach(tagFiltro => {

                let temNaPessoa = false;

                if (combinaProxFiltro) {
                    let valor = (<string>tagFiltro.valor);

                    if (valor.indexOf(" ") >= 0) {
                        valor = valor.split(" ").pop();
                    }

                    valor = valor.trim().toLowerCase();
                    valor = valor.replace(",", ".");

                    let valorFloat = Number.parseFloat(valor);

                    if (tagRef.Run(pessoa, valorFloat)) {
                        temNaPessoa = true;
                    }

                    combinaProxFiltro = false;
                    tagRef = null;
                }

                else if (tagFiltro.combinaProximoFiltro) {
                    combinaProxFiltro = true;
                    tagRef = tagFiltro;
                }
                
                else if (tagFiltro.inteligente) {
                    if (tagFiltro.Run(pessoa, null)) {
                        temNaPessoa = true;
                    }
                }

                else if (tagFiltro.adicional) {
                    let tagValores = tagFiltro.valor;
                    let propValPessoa = pessoa[tagFiltro.propNome.trim().toLowerCase()];
                    if (propValPessoa) {
                        propValPessoa = propValPessoa.trim().toLowerCase();

                        for (let tagValor of tagValores) {
                            tagValor = tagValor.trim().toLowerCase();
                            if (filtro.valoresExatos) {
                                if (tagValor === propValPessoa) {
                                    temNaPessoa = true;
                                }
                            } else {
                                if (propValPessoa.indexOf(tagValor) >= 0)
                                    temNaPessoa = true;
                            }
                        }
                    }
                }

                else if (tagFiltro.geral) {
                    let tagValor = tagFiltro.valor.trim().toLowerCase();
                    for (let prop of Object.keys(pessoa)) {
                        let propValPessoa = pessoa[prop];

                        if (propValPessoa && typeof propValPessoa === 'string') {
                            propValPessoa = propValPessoa.trim().toLowerCase();

                            if (filtro.valoresExatos) {
                                if (tagValor === propValPessoa) {
                                    temNaPessoa = true;
                                }
                            } else {
                                if (propValPessoa.indexOf(tagValor) >= 0)
                                    temNaPessoa = true;
                            }
                        }
                    }
                }

                else {

                    let tagValor = tagFiltro.valor.trim().toLowerCase();
                    let propValPessoa = pessoa[tagFiltro.propNome.trim().toLowerCase()];

                    if (propValPessoa) {
                        propValPessoa = propValPessoa.trim().toLowerCase();

                        if (filtro.valoresExatos) {
                            if (tagValor === propValPessoa) {
                                temNaPessoa = true;
                            }
                        } else {
                            if (propValPessoa.indexOf(tagValor) >= 0)
                                temNaPessoa = true;
                        }
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
