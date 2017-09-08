import { Component, OnInit } from '@angular/core';
import { PessoasService } from "./pessoas.service";
import { Pessoa, PessoasPropriedades, PropriedadeComNome } from "./pessoa";
import { ColigadosService } from "../coligados/coligados.service";
import { ControleTags, ITagFiltro, TagFiltro, ConstrutorDeTag } from "./tags";
import { AppGlobals } from "../global/global";
import { Router, RouterStateSnapshot } from "@angular/router";
import { AutoComplete } from "../global/helpers";

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

  service: PessoasService;
  router: Router;
  mensagem: string = '';

  propsDeFiltro: TagFiltro[] = new Array<TagFiltro>();

  constructor(service: PessoasService, router: Router, globals: AppGlobals) {
    this.service = service;
    this.router = router;

    if (!globals.isUserLoggedIn.getValue())
      router.navigate(["/login"], { queryParams: { returnUrl: router.routerState.snapshot.url } });

  }

  ngAfterViewInit() {

    this.service.todos()
      .subscribe(
      retornoPessoas => {
        this.pessoas = retornoPessoas;
        this.service.buscaPropriedades()
          .subscribe(
          retornoProps => {
            this.preparaTagFiltros(retornoPessoas, retornoProps.porNome);
            this.preparaChip();
          },
          erro => console.log(erro)
          );
      },
      error => console.log(error)
      );
  }

  private preparaTagFiltros(pessoas: Pessoa[], props: PropriedadeComNome[]) {

    let construtor = new ConstrutorDeTag();

    for (let prop of props) {
      for (let val of prop.value) {
        let tagFiltro = construtor.construirTag(val, prop.key);

        if (tagFiltro != null && this.propsDeFiltro.filter(t => t.tag === tagFiltro.tag).length <= 0) {
          this.propsDeFiltro.push(tagFiltro);
        }
      }
    }

    this.propsDeFiltro = this.propsDeFiltro.concat(construtor.construirTodos());
  }

  private preparaChip() {

    let chipData = this.preparaPropriedades(this.propsDeFiltro);

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

  private preparaPropriedades(tags: TagFiltro[]) {
    let tagsString: string[] = [];
    for (let tag of tags) {
      tagsString.push(tag.tag);
    }

    return AutoComplete.preparaData(tagsString);
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
        let filtroAtualizado = new PessoaFiltro(this.filtro);

        let tagFiltro = TagFiltro.BuscaTag(chip.tag, this.propsDeFiltro);
        if (!tagFiltro)
          tagFiltro = new TagFiltro(chip.tag, chip.tag);

        filtroAtualizado.filtros.push(tagFiltro);

        this.filtro = filtroAtualizado;

        if (tagFiltro.inteligente || tagFiltro.adicional) {
          $('.chip:last-of-type').addClass("orange");
        }
        else if (tagFiltro.geral) {
          // $('.chip:last-of-type').addClass("grey lighten-2");
        }
        else {
          $('.chip:last-of-type').addClass("blue-grey lighten-3");
        }

        console.log('tag added: ' + chip.tag);
      }
    );
  }

  private onChipDelete() {
    $('.chips-autocomplete').on('chip.delete',
      (e, chip) => {
        let filtroAtualizado = new PessoaFiltro(this.filtro);

        let tagFiltro = TagFiltro.BuscaTag(chip.tag, this.filtro.filtros);

        let i = filtroAtualizado.filtros.indexOf(tagFiltro, 0);
        if (i > -1)
          filtroAtualizado.filtros.splice(i, 1);

        this.filtro = filtroAtualizado;

        console.log('tag removed: ' + chip.tag);
      }
    );
  }

  ngOnInit() {
  }

}

export class PessoaFiltro {
  filtros: ITagFiltro[] = [];
  validarTodos: boolean = false;
  valoresExatos: boolean = false;

  constructor(pf: PessoaFiltro = null, pp: Pessoa[] = null, fs: ITagFiltro[] = null, vt: boolean = null, ve: boolean = null) {
    if (pf != null) {
      this.filtros = pf.filtros;
      this.validarTodos = pf.validarTodos;
      this.valoresExatos = pf.valoresExatos;
    }

    if (fs != null)
      this.filtros = fs;

    if (vt != null)
      this.validarTodos = vt;

    if (ve != null)
      this.valoresExatos = ve;
  }
}

