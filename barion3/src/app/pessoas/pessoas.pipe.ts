import { Pipe, PipeTransform } from '@angular/core';
import { Pessoa, PessoasPropriedades } from "./pessoa";
import { PessoaFiltro } from "./pessoas.component";

@Pipe({
    name: 'filtroPessoas'
})
export class PessoasPipe implements PipeTransform {
    transform(pessoas: Pessoa[], filtro: PessoaFiltro) {

        console.log(filtro.validarTodos);
        console.log(filtro.valoresExatos);

        if (filtro.filtros.length <= 0)
            return pessoas;

        let ids: number[] = [];
        let propsFiltradas = new Array<PessoasPropriedades>();

        filtro.pessoasPropriedades.forEach(pessoa => {
            let temTodosFiltros = true;
            let temAlgumFiltro = false;

            filtro.filtros.forEach(f => {

                let temNaPessoa = false;
                pessoa.propriedades.forEach(prop => {
                    if (prop && typeof prop === 'string') {
                        if (filtro.valoresExatos) {
                            if (prop === f) {
                                temNaPessoa = true;
                            }
                        } else {
                            if (prop.indexOf(f) >= 0) {
                                temNaPessoa = true;
                            }
                        }
                    }
                });

                if (temNaPessoa) {
                    temAlgumFiltro = true;
                }
                if (!temNaPessoa) {
                    temTodosFiltros = false;
                }
            });

            if (filtro.validarTodos && temTodosFiltros) {
                ids.push(pessoa.id);
            } else if (!filtro.validarTodos && temAlgumFiltro) {
                ids.push(pessoa.id);
            }

        })

        let pessoasFiltradas = pessoas.filter(pessoa => ids.indexOf(pessoa.id) >= 0);

        return pessoasFiltradas;

        // filtro.filtros.forEach(f => {
        //     filtro.pessoasPropriedades.forEach(p => {
        //         let temNoP = false;

        //         p.propriedades.forEach(
        //             p2 => {
        //                 if (p2 && typeof p2 === 'string') {

        //                     if (filtro.valoresExatos) {
        //                         if (p2 == f)
        //                             temNoP = true;
        //                     } else {
        //                         if (p2.indexOf(f) >= 0) {
        //                             temNoP = true;
        //                         }
        //                     }



        //                 }
        //             }
        //         );

        //         if (temNoP) {
        //             if (ids.indexOf(p.id) < 0) {
        //                 ids.push(p.id);
        //             }
        //         }
        //     })
        // })

    }
}
