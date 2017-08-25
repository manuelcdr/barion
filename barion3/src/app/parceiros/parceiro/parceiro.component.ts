import { Component, OnInit } from '@angular/core';
import { Parceiro } from "../parceiro";
import { ParceirosService } from "../parceiros.service";
import { ActivatedRoute, Router } from "@angular/router";
import cep from "cep-promise";
import { ToolTip } from "../../global/helpers";

declare var Materialize : any;
declare var $ : any;

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.component.html',
  styleUrls: ['./parceiro.component.css']
})
export class ParceiroComponent implements OnInit {

  parceiro: Parceiro = new Parceiro();

  service: ParceirosService;
  route: ActivatedRoute;
  router: Router;

  constructor(service: ParceirosService, route: ActivatedRoute, router: Router) {
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
            parceiro => {
              this.parceiro = parceiro;
              console.log('recuperou o coligado');
              console.log(parceiro);
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
          this.parceiro.endereco = endereco.street;
          this.parceiro.estado = endereco.state;
          this.parceiro.bairro = endereco.neighborhood;
          this.parceiro.cidade = endereco.city;
          this.parceiro.cep = endereco.cep;
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
      .atualizaCadastra(this.parceiro)
      .subscribe(
      retorno => {
        console.log('tostei');
        Materialize.toast(retorno.msg, 5000);
        this.router.navigate(['/parceiros'])
        console.log(retorno.msg);
      },
      erro => {
        console.log(erro);
      }
      );

    console.log('cadastrei');
  }

}
