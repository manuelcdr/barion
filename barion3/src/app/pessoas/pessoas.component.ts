import { Component, OnInit } from '@angular/core';
import { PessoasService } from "./pessoas.service";
import { Pessoa } from "./pessoa";

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  pessoas: Pessoa[] = [];

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
    $(document).ready(function () {

      console.log('chips1');

      $('.chips-autocomplete').material_chip({
        autocompleteOptions: {
          data: {
            'Apple': null,
            'Microsoft': null,
            'Google': null
          },
          limit: Infinity,
          minLength: 1
        },
        placeholder: 'Digite algo para pesquisar',
        secondaryPlaceholder: '+Tag'
      });

      console.log('chips2');
    });
  }

  ngAfterViewChecked() {

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
