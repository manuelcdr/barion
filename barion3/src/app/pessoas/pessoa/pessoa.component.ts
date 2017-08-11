import { Component, OnInit } from '@angular/core';
import { Pessoa } from "../pessoa";
import { PessoasService } from "../pessoas.service";
import { ActivatedRoute, Router } from "@angular/router";

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();

  service: PessoasService;
  route: ActivatedRoute;
  router: Router;

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
              console.log('recuperou o coligado');
              console.log(pessoa);
            },
            erro => {
              console.log(erro);
            })
        }
      }
    );
  }

  ngAfterContentChecked() {
    console.log('passei');

  }

  ngAfterViewInit() {
    $(document).ready(function () {

      Materialize.updateTextFields();

      $('ul.tabs').tabs();

    });
  }

  onSubmit(form) {
    console.log('onSubmit');

    this.service
      .atualizaCadastra(this.pessoa)
      .subscribe(
      retorno => {
        console.log('tostei');
        Materialize.toast(retorno.msg, 5000);
        this.router.navigate(['/pessoas'])
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

}
