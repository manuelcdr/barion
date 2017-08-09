import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ColigadosService } from "../coligados.service";
import { ActivatedRoute, Router } from "@angular/router";

declare const Materialize : any;

@Component({
  selector: 'coligado',
  templateUrl: './coligado.component.html',
  styleUrls: ['./coligado.component.css']
})
export class ColigadoComponent implements OnInit {

  coligado: Coligado = new Coligado();

  service: ColigadosService;
  route: ActivatedRoute;
  router: Router;

  constructor(service: ColigadosService, route: ActivatedRoute, router: Router) {
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
            coligado => {
              this.coligado = coligado;
              console.log('recuperou o coligado');
              console.log(coligado);
            },
            erro => {
              console.log(erro);
            })
        }
      }
    );
  }

  ngOnInit() {
    console.log(Materialize);
  }
  

  onSubmit(form) {
    console.log('onSubmit');
    console.log(this.coligado);

    this.service
      .cadastra(this.coligado)
      .subscribe(
      retorno => {
        console.log(retorno.msg);
      },
      erro => {
        console.log(erro);
      });
  }

}

export class Coligado {
  id: number;
  nome: string;
  cnpj: string;
  ie: string;
  cidade: string;
  estado: string;
  endereco: string;
  contato: string;
  celular: string;
  telefoneset: string;
  email: string;
  banco: string;
  agencia: string;
  conta: string;
}
