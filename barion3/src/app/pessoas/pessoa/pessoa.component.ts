import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Pessoa, PropriedadeComNome } from "../pessoa";
import { PessoasService } from "../pessoas.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { default as cep } from 'cep-promise'
import { ToolTip } from "../../global/helpers";

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  //propriedades: PropriedadeComNome[];

  service: PessoasService;
  route: ActivatedRoute;
  router: Router;

  @ViewChild('fotoRosto') fotoRosto: ElementRef;
  @ViewChild('fotoCorpo1') fotoCorpo1: ElementRef;
  @ViewChild('fotoCorpo2') fotoCorpo2: ElementRef;

  constructor(service: PessoasService, route: ActivatedRoute, router: Router) {
    this.service = service;
    this.route = route;
    this.router = router;

    // busca foto correspondente ao id
    this.route.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.service.buscaPorId(id)
            .subscribe(
            pessoa => {
              this.pessoa = pessoa;
            },
            erro => {
              console.log(erro);
            })
        }
      }
    );
  }

  ngAfterViewChecked() {
    Materialize.updateTextFields();
    $('.materialboxed').materialbox();
  }

  ngAfterViewInit() {
    $(document).ready(() => {
      this.preparaTabs();
      this.preparaAutocompletes();
    });
  }

  atualizaEndereco(campoCep: HTMLInputElement) {
    if (campoCep.value.length > 0) {
      cep(campoCep.value)
        .then(endereco => {
          this.pessoa.endereco = endereco.street;
          this.pessoa.estado = endereco.state;
          this.pessoa.bairro = endereco.neighborhood;
          this.pessoa.cidade = endereco.city;
          this.pessoa.cep = endereco.cep;
        })
        .catch(error => {
          ToolTip.showByElement(campoCep, 'CEP não encontrado', 'right');
        });
    }
  }

  mostrarFoto(uploader: HTMLInputElement, imgShow: HTMLImageElement) {
    if (uploader.files && uploader.files[0]) {
      $(imgShow).attr('src', window.URL.createObjectURL(uploader.files[0]));
    }
  }

  onSubmit(event: any) {
    this.service
      .atualizaCadastra(this.pessoa)
      .subscribe(
      retorno => {
        console.log('tostei');
        console.log(retorno);
        Materialize.toast(retorno.msg, 5000);

        console.log(this.fotoRosto);
        console.log(this.fotoCorpo1);
        console.log(this.fotoCorpo2);

        debugger;

        this.service.salvarImagens(
          retorno.retornoObj,
          this.fotoRosto.nativeElement,
          this.fotoCorpo1.nativeElement,
          this.fotoCorpo2.nativeElement).subscribe(
          retorno => {
            console.log('salva imagens:');
            console.log(retorno);
          },
          erro => console.log(erro)
          );
        console.log(retorno.msg);
      },
      erro => {
        console.log(erro);
      }
      );

    console.log('cadastrei');
  }


  ngOnInit() {
  }

  private preparaTabs() {
    $('ul.tabs').tabs();
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
              let novaPessoa = new Pessoa();
              for (let key of Object.keys(this.pessoa)) {
                if (ac.name == key)
                  novaPessoa[key] = val;
                else
                  novaPessoa[key] = this.pessoa[key];
              }
              this.pessoa = novaPessoa;
            }
          });
        }

      },
      erro => console.log(erro)
      );

  }

}
