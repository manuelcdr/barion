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

  constructor(service : ParceirosService, router: Router, globals : AppGlobals) { 
    this.service = service;
    this.router = router;
    
    if (!globals.isUserLoggedIn.getValue())
      router.navigate(["/login"], { queryParams: { returnUrl: router.routerState.snapshot.url }});

    service.todos().subscribe(
      lista => {
        this.parceiros = lista;
      },
      erro => {
        console.log(erro);
      }
    );

  }

  ngOnInit() {
  }

  editar(parceiro : Parceiro) {
    this.router.navigate(['/parceiros/' + parceiro.id])
  }

}
