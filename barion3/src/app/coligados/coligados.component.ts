import { Component, OnInit } from '@angular/core';
import { ColigadosService } from "./coligados.service";
import { Router } from "@angular/router";
import { Coligado } from "./coligado";
import { AppGlobals } from "../global/global";
import { Loader } from "../global/helpers";

@Component({
  selector: 'coligados',
  templateUrl: './coligados.component.html',
  styleUrls: ['./coligados.component.css']
})
export class ColigadosComponent implements OnInit {

  service: ColigadosService;
  router: Router;
  coligados: Coligado[] = [];
  propriedades: string[] = [];
  showLoaderPipe : boolean = false;

  constructor(service: ColigadosService, router: Router, globals : AppGlobals) {
    this.service = service;
    this.router = router;

    if (!globals.isUserLoggedIn.getValue())
      router.navigate(["/login"], { queryParams: { returnUrl: router.routerState.snapshot.url }});

    this.showLoaderPipe = true;

    service.todos().subscribe(
      lista => {
        this.coligados = lista;
      },
      erro => {
        console.log(erro);
      },
      () => {
        console.log('complete');
        this.showLoaderPipe = false;
      }
    );

  }

  ngOnInit() {
  }

  editar(coligado: Coligado) {
    this.router.navigate(['/coligados/' + coligado.id])
  }

  remover(coligado: Coligado) {
    this.coligados = null;
    this.showLoaderPipe = true;

    this.service.remove(coligado.id.toString()).subscribe(
      retorno => {
        this.service.todos().subscribe(
          lista => {
            this.coligados = lista;
          },
          erro => {
            console.log(erro);
          },
          () => this.showLoaderPipe = false
        );
      },
      erro => console.log(erro),
      () => this.showLoaderPipe = false
    );
  }

}
