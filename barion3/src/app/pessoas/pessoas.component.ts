import { Component, OnInit } from '@angular/core';
import { PessoasService } from "./pessoas.service";
import { Pessoa } from "./pessoa";
import { ColigadosService } from "../coligados/coligados.service";

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  pessoas: Pessoa[] = [];
  filtro: PessoaFiltro = new PessoaFiltro();
  filtroTags : string = '';

  service: PessoasService;
  mensagem: string = '';

  constructor(service: PessoasService) {
    console.log('construi');
    this.service = service;
  }

  ngAfterViewInit() {

    this.service.todos()
      .subscribe(
      retorno => {
        console.log(retorno);
        this.pessoas = retorno;
        this.filtro.pessoasPropriedades = this.pegaPropsPessoas(retorno);
      },
      error => console.log(error)
      );

    this.service.buscaPropriedades()
      .subscribe(
      retorno => {
        console.log(retorno);
        this.preparaChip(retorno);
      },
      erro => console.log(erro)
      );
  }

  private preparaChip(props: string[]) {

    let chipData = this.preparaPropriedades(props);

    $(document).ready(() => {

      $('.chips-autocomplete').material_chip({
        autocompleteOptions: {
          data: chipData,
          limit: Infinity,
          minLength: 1
        },
        placeholder: 'Pesquisar pessoas',
        secondaryPlaceholder: '+Tag'
      });

      this.onChipAdd();
      this.onChipDelete();

    });
  }

  private onChipAdd() {
    $('.chips-autocomplete').on('chip.add',
      (e, chip) => {
        let tag = chip.tag;
        let filtroAtualizado = new PessoaFiltro();
        filtroAtualizado.filtros = this.filtro.filtros;
        filtroAtualizado.pessoasPropriedades = this.filtro.pessoasPropriedades;
        
        filtroAtualizado.filtros.push(tag);
        
        
        this.filtro = filtroAtualizado;

        this.filtroTags += `(((${tag})))`;

        console.log('tag added: ' + chip.tag);
      }
    );
  }

  private onChipDelete() {
    $('.chips-autocomplete').on('chip.delete',
      (e, chip) => {
        let tag = chip.tag;
        
        let filtroAtualizado = new PessoaFiltro();
        filtroAtualizado.filtros = this.filtro.filtros;
        filtroAtualizado.pessoasPropriedades = this.filtro.pessoasPropriedades;

        let i = filtroAtualizado.filtros.indexOf(tag, 0);
        if (i > -1) {
          filtroAtualizado.filtros.splice(i, 1);
        }
        this.filtro = filtroAtualizado;

        this.filtroTags = this.filtroTags.replace(`(((${tag})))`, "");
        
        console.log('tag removed: ' + chip.tag);
      }
    );
  }

  private pegaPropsPessoas(pessoas: Pessoa[]): PessoasPropriedades[] {

    var pessoasPropriedades = new Array<PessoasPropriedades>();

    pessoas.forEach(pessoa => {
      pessoasPropriedades.push(this.pegaPropsPessoa(pessoa))
    })

    return pessoasPropriedades;
  }

  private pegaPropsPessoa(pessoa: Pessoa): PessoasPropriedades {
    var props = new PessoasPropriedades();
    props.id = pessoa.id;

    for (let key of Object.keys(pessoa)) {
      props.propriedades.push(pessoa[key]);
    }

    return props;
  }

  private preparaPropriedades(props: string[]) {
    let propriedadesModificadas = {};

    for (let prop of props) {
      propriedadesModificadas[prop] = null;
    }

    return propriedadesModificadas;
  }

  ngOnInit() {
  }

}

export class PessoasPropriedades {
  id: number;
  propriedades: string[] = [];
}

export class PessoaFiltro {
  pessoasPropriedades: PessoasPropriedades[] = []
  filtros: string[] = []
}