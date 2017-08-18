import { Component, OnInit } from '@angular/core';
import { PessoasService } from "./pessoas.service";
import { Pessoa, PessoasPropriedades } from "./pessoa";
import { ColigadosService } from "../coligados/coligados.service";
import { TagsAdicionais } from "./tags";

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
  filtroTags: string = '';

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
        this.filtro.pessoasPropriedades = Pessoa.pegaPropsPessoas(retorno);
      },
      error => console.log(error)
      );

    this.service.buscaPropriedades()
      .subscribe(
      retorno => {
        console.log(retorno);
        let props = new Array<string>().concat(retorno.todasPropriedades, new TagsAdicionais().todas);
        this.preparaChip(props);
      },
      erro => console.log(erro)
      );
  }

  private preparaChip(props: string[]) {

    let chipData = Pessoa.preparaPropriedades(props);

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

  mudaValoresExatos(valor: boolean) {
    let filtro = new PessoaFiltro(this.filtro, null, null, null, valor);
    this.filtro = filtro;;
  }

  mudaValidarTodos(valor: boolean) {
    let filtro = new PessoaFiltro(this.filtro, null, null, valor);
    this.filtro = filtro;
  }

  private onChipAdd() {
    $('.chips-autocomplete').on('chip.add',
      (e, chip) => {
        let tag = chip.tag;

        let filtroAtualizado = new PessoaFiltro(this.filtro);

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

        let filtroAtualizado = new PessoaFiltro(this.filtro);

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

  ngOnInit() {
  }

}

export class PessoaFiltro {
  pessoasPropriedades: PessoasPropriedades[] = [];
  filtros: string[] = [];
  validarTodos: boolean = false;
  valoresExatos: boolean = false;

  constructor(pf: PessoaFiltro = null, pp: PessoasPropriedades[] = null, fs: string[] = null, vt: boolean = null, ve: boolean = null) {
    if (pf != null) {
      this.filtros = pf.filtros;
      this.pessoasPropriedades = pf.pessoasPropriedades;
      this.validarTodos = pf.validarTodos;
      this.valoresExatos = pf.valoresExatos;
    }

    if (pp != null)
      this.pessoasPropriedades = pp;

    if (fs != null)
      this.filtros = fs;

    if (vt != null)
      this.validarTodos = vt;

    if (ve != null)
      this.valoresExatos = ve;
  }
}