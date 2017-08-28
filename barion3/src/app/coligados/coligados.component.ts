import { Component, OnInit } from '@angular/core';
import { ColigadosService } from "./coligados.service";
import { Router } from "@angular/router";
import { Coligado } from "./coligado";
import { AppGlobals } from "../global/global";

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

  constructor(service: ColigadosService, router: Router, globals : AppGlobals) {
    this.service = service;
    this.router = router;

    if (!globals.isUserLoggedIn.getValue())
      router.navigate(["/login"], { queryParams: { returnUrl: router.routerState.snapshot.url }});

    service.todos().subscribe(
      lista => {
        this.coligados = lista;
        console.log(this.coligados);
      },
      erro => {
        console.log(erro);
      }
    );

  }

  ngOnInit() {
  }

  editar(coligado: Coligado) {
    console.log('editar');
    console.log(coligado);

    this.router.navigate(['/coligados/' + coligado.id])
  }

}
