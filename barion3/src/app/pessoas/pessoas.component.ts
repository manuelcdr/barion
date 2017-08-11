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
  propriedades: string[];

  service: PessoasService;
  mensagem: string = '';

  constructor(service: PessoasService) {
    console.log('construi');
    this.service = service;
    this.service.todos()
      .subscribe(
      retorno => {
        console.log(retorno);
        this.pessoas = retorno;
      },
      error => console.log(error)
      );
  }

  ngAfterViewInit() {

    new ColigadosService(this.service.http).buscaPropriedades()
      .subscribe(
      retorno => {
        console.log(retorno);

        let propriedadesModificadas = {};

        for(let prop of retorno){
          propriedadesModificadas[prop] = null;
        }

        $(document).ready(function () {

          console.log('chips1');

          $('.chips-autocomplete').material_chip({
            autocompleteOptions: {
              data: propriedadesModificadas,
              limit: Infinity,
              minLength: 1
            },
            placeholder: 'Digite algo para pesquisar',
            secondaryPlaceholder: '+Tag'
          });

          console.log('chips2');
        });







        //this.propriedades = retorno;
      },
      erro => console.log(erro)
      );
    // var props = this.propriedades.slice(0, this.propriedades.length);

    // console.log(props);

    // var myConvertedData = {};


    // for(var i = 0; i < props.length; ++i ) {
    //   myConvertedData[this.propriedades[i]] = null;
    // }

    // $.each(props,  function (index, value) {
    //   myConvertedData[value] = null;
    // });

    // console.log('propriedades: ');
    // console.log(myConvertedData);



  }


  buscar(busca: string) {
    console.log('busca:' + busca);
    busca.split(",").forEach(busca => {
      busca = busca.trim();
      console.log(busca);
      let retornoBusca = new Array<string>();

      this.service.buscaPorId(busca).subscribe(
        pessoa => {
          console.log(pessoa);
          //retornoBusca.push(pessoa);
          //this.pessoas = retornoBusca;
          console.log(this.pessoas);
        },
        erro => {
          console.log(erro);
        });
    });
  }




  ngOnInit() {
  }

}
