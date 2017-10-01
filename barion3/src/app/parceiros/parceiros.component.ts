import { Component, OnInit } from '@angular/core';
import { ParceirosService } from "./parceiros.service";
import { Router } from "@angular/router";
import { Parceiro } from "./parceiro";
import { AppGlobals } from "../global/global";

@Component({
  selector: 'app-parceiros',
  templateUrl: './parceiros.component.html',
  styleUrls: ['./parceiros.component.css']
})
export class ParceirosComponent implements OnInit {

  service : ParceirosService;
  router: Router;

  parceiros : Parceiro[] = [];
  showLoaderPipe : boolean = false;

  constructor(service : ParceirosService, router: Router, globals : AppGlobals) { 
    this.service = service;
    this.router = router;
    
    if (!globals.isUserLoggedIn.getValue())
      router.navigate(["/login"], { queryParams: { returnUrl: router.routerState.snapshot.url }});

    this.showLoaderPipe = true;

    service.todos().subscribe(
      lista => {
        this.parceiros = lista;
      },
      erro => {
        console.log(erro);
      },
      () => this.showLoaderPipe = false
    );

  }

  ngOnInit() {
  }

  editar(parceiro : Parceiro) {
    this.router.navigate(['/parceiros/' + parceiro.id])
  }

  remover(parceiro: Parceiro) {
    this.parceiros = null;
    this.showLoaderPipe = true;

    this.service.remove(parceiro.id.toString()).subscribe(
      retorno => {
        this.service.todos().subscribe(
          lista => {
            this.parceiros = lista;
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
