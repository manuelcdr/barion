import { Component, OnInit } from '@angular/core';
import { PessoasService } from "./pessoas.service";
import { Pessoa, PessoasPropriedades } from "./pessoa";
import { ColigadosService } from "../coligados/coligados.service";
import { TagsAdicionais } from "./tags";
import { AppGlobals } from "../global/global";
import { Router, RouterStateSnapshot } from "@angular/router";

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
  router: Router;
  mensagem: string = '';

  medidaAltura: MedidaFiltro = new MedidaFiltro("altura");
  medidaManequim: MedidaFiltro = new MedidaFiltro("manequim");
  medidaCintura: MedidaFiltro = new MedidaFiltro("cintura");
  medidaQuadril: MedidaFiltro = new MedidaFiltro("quadril");
  medidaBusto: MedidaFiltro = new MedidaFiltro("busto");
  medidaSapato: MedidaFiltro = new MedidaFiltro("sapato");

  constructor(service: PessoasService, router: Router, globals: AppGlobals) {
    console.log('construi');
    this.service = service;
    this.router = router;

    if (!globals.isUserLoggedIn.getValue())
      router.navigate(["/login"], { queryParams: { returnUrl: router.routerState.snapshot.url } });

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

    $(document).ready(() => {
      this.preparaAutocompletes();
    });
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

  private preparaAutocompletes() {

    this.service.buscaPropriedadesComNome()
      .subscribe(
      retorno => {
        var propriedades = retorno;
        var autoCompletes: any[] = $('input.autocomplete');

        for (var i = 0; i < autoCompletes.length; i++) {
          let ac = autoCompletes[i];
          var props = Pessoa.preparaPropriedadesComNome(ac.name, propriedades);
          $(ac).attr('autocomplete', 'off');
          $(ac).autocomplete({
            data: props,
            limit: Infinity,
            minLength: 1,
            onAutocomplete: val => {
              this.atualizaMedidaFiltro(ac.name, val);
            }
          });
        }

      },
      erro => console.log(erro)
      );

  }

  atualizaMedidaFiltro(propNome: string, valor: number) {
    if (valor == undefined || valor <= 0) {
      this.filtro.removeMedida(propNome);
    } else {
      let maiorQue = $('#maiorQue-' + propNome).checked();
      let menorQue = $('#menorQue-' + propNome).checked();
      //this.filtro.addMedida(new MedidaFiltro(propNome, valor, maiorQue, menorQue))
    }
    this.filtro = new PessoaFiltro(this.filtro);
  }

  ngOnInit() {
  }

}

export class MedidaFiltro {
  tipo: string;
  propNome: string;
  valor: Number;

  constructor(propNome: string, valor: number = 0, tipo: string = "") {
    this.propNome = propNome;
    this.valor = valor;
    this.tipo = tipo;
  }
}

export class PessoaFiltro {
  pessoasPropriedades: PessoasPropriedades[] = [];
  filtros: string[] = [];
  validarTodos: boolean = false;
  valoresExatos: boolean = false;
  medidas: MedidaFiltro[] = [];

  addMedida(mf: MedidaFiltro) {
    if (this.medidas.length > 0) {
      let index = this.medidas.indexOf(this.medidas.filter(m => m.propNome === mf.propNome)[0]);
      if (index >= 0) {
        this.medidas.splice(index, 1, mf);
      } else {
        this.medidas.push(mf);
      }
    }
  }

  removeMedida(propNome: string) {
    let index = this.medidas.indexOf(this.medidas.filter(m => m.propNome === propNome)[0]);
    if (index >= 0) {
      this.medidas.splice(index, 1);
    }
  }

  constructor(pf: PessoaFiltro = null, pp: PessoasPropriedades[] = null, fs: string[] = null, vt: boolean = null, ve: boolean = null, mfs: MedidaFiltro[] = null) {
    if (pf != null) {
      this.filtros = pf.filtros;
      this.pessoasPropriedades = pf.pessoasPropriedades;
      this.validarTodos = pf.validarTodos;
      this.valoresExatos = pf.valoresExatos;
      this.medidas = pf.medidas;
    }

    if (pp != null)
      this.pessoasPropriedades = pp;

    if (fs != null)
      this.filtros = fs;

    if (vt != null)
      this.validarTodos = vt;

    if (ve != null)
      this.valoresExatos = ve;

    if (mfs != null)
      this.medidas = mfs;
  }
}