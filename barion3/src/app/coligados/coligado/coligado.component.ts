import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ColigadosService } from "../coligados.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Coligado } from "../coligado";
import cep from "cep-promise";
import { ToolTip } from "../../global/helpers";
import { AppGlobals } from "../../global/global";

declare const Materialize: any;
declare const $: any;

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

  constructor(service: ColigadosService, route: ActivatedRoute, router: Router, globals: AppGlobals) {
    this.service = service;
    this.route = route;
    this.router = router;

    if (!globals.isUserLoggedIn.getValue())
      router.navigate(["/login"], { queryParams: { returnUrl: router.routerState.snapshot.url } });

    this.route.params.subscribe(
      params => {
        let id = params['id'];
        if (id) {
          this.service.buscaPorId(id)
            .subscribe(
            coligado => {
              this.coligado = coligado;
            },
            erro => {
              console.log(erro);
            })
        }
      }
    );
  }

  atualizaEndereco(campoCep: HTMLInputElement) {
    if (campoCep.value.length > 0) {
      cep(campoCep.value)
        .then(endereco => {
          this.coligado.endereco = endereco.street;
          this.coligado.estado = endereco.state;
          this.coligado.bairro = endereco.neighborhood;
          this.coligado.cidade = endereco.city;
          this.coligado.cep = endereco.cep;
        })
        .catch(error => {
          ToolTip.showByElement(campoCep, 'CEP não encontrado', 'right');
        });
    }
  }

  ngOnInit() {
    //console.log(Materialize);
  }

  ngAfterContentChecked() {
    console.log('passei');
    Materialize.updateTextFields();
  }


  onSubmit(form) {
    console.log('onSubmit');

    this.service
      .atualizaCadastra(this.coligado)
      .subscribe(
      retorno => {
        console.log('tostei');
        Materialize.toast(retorno.msg, 5000);
        this.router.navigate(['/coligados'])
        console.log(retorno.msg);
      },
      erro => {
        console.log(erro);
      }
      );

    console.log('cadastrei');
  }

}
