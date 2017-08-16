import { Pipe, PipeTransform } from '@angular/core';
import { Pessoa, PessoasPropriedades } from "./pessoa";
import { PessoaFiltro } from "./pessoas.component";

@Pipe({
    name: 'filtroPessoas'
})
export class PessoasPipe implements PipeTransform {
    transform(pessoas: Pessoa[], filtro: PessoaFiltro) {

        if (filtro.filtros.length <= 0)
            return pessoas;

        let ids: number[] = [];
        let propsFiltradas = new Array<PessoasPropriedades>();
        // filtro.pessoasPropriedades.forEach(p => {
        filtro.filtros.forEach(f => {
            // let ps1 = filtro.pessoasPropriedades.filter(p => p.propriedades.indexOf(f) >= 0);
            // ps1.forEach(p => {
            //     if (ids.indexOf(p.id) < 0) {
            //         ids.push(p.id);
            //     }
            // });

            filtro.pessoasPropriedades.forEach(p => {
                let temNoP = false;

                p.propriedades.forEach(
                    p2 => {
                        if (p2 && typeof p2 === 'string') {
                            if (p2.indexOf(f) >= 0) {
                                temNoP = true;
                            }
                        }
                    }
                );

                if (temNoP) {
                    if (ids.indexOf(p.id) < 0) {
                        ids.push(p.id);
                    }
                }
            })

            // let ps1 = filtro.pessoasPropriedades.filter(p => p.propriedades.indexOf(f) >= 0 );
            // if (i >= 0) {
            //     if (ids.indexOf(p.id) < 0) {
            //         ids.push(p.id);
            //     }
            // }
        })
        // })

        let pessoasFiltradas = pessoas.filter(pessoa => ids.indexOf(pessoa.id) >= 0);

        return pessoasFiltradas;
    }
}
