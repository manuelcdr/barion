import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Pessoa, PropriedadeComNome } from "../pessoa";
import { PessoasService } from "../pessoas.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

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
      this.preparaPickdate();
      this.preparaAutocompletes();
    });
  }

  changeFotoRosto(el: ElementRef) {
    if (this.pessoa && this.pessoa.id > 0) {
      if (this.fotoRosto.nativeElement.value) {
        let fotoRosto = this.fotoRosto.nativeElement;
        this.service
          .salvarImagens(this.pessoa.id, fotoRosto)
          .subscribe(ret => {
            // console.log(ret);
            // console.log(ret.retornoObj);
            this.pessoa.fotoRosto = ret.retornoObj.fileNames.fotoRosto;
          });
      }
    }
  }

  onSubmit(event: any) {
    console.log('onSubmit');

    console.log(event);

    this.service
      .atualizaCadastra(this.pessoa)
      .subscribe(
      retorno => {
        console.log('tostei');
        Materialize.toast(retorno.msg, 5000);

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

  private preparaPickdate() {
    var diaSemana = ['Domingo', 'Segunda-Feira', 'Terca-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'];
    var mesAno = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    var data = new Date();
    var hoje = diaSemana[data.getDay()] + ', ' + mesAno[data.getMonth()] + ' de ' + data.getFullYear();

    $('.datepicker').pickadate({
      //monthsFull: mesAno,
      //monthsShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
      // weekdaysFull: diaSemana,
      // weekdaysShort: [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
      // weekdaysLetter: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      // clear: false,
      format: 'dd/mm/yyyy',
      today: "Hoje",
      close: "Fechar",
      //min: new Date(data.getFullYear() - 1, 0, 1),
      //max: new Date(data.getFullYear() + 1, 11, 31),
      closeOnSelect: false,
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 30 // Creates a dropdown of 15 years to control year
    });
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
          $(ac).autocomplete({
            data: props,
            limit: Infinity,
            minLength: 1
          });
          $(ac).attr('autocomplete', 'off');
        }

      },
      erro => console.log(erro)
      );

  }

}
