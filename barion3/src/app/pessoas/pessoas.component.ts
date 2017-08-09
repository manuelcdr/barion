import { Component, OnInit } from '@angular/core';
import { PessoasService } from "./pessoas.service";
import { Pessoa } from "./pessoa/pessoa.component";

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  pessoas : Pessoa[] = [];

  service: PessoasService;
  mensagem: string = '';

  constructor(service: PessoasService) {
    console.log('construi');
    this.service = service;
    this.service.lista()
      .subscribe(
      retorno => {
        console.log(retorno);
        this.pessoas = retorno;
      },
      error => console.log(error)
      );
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