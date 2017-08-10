import { Component, OnInit } from '@angular/core';
import { ParceirosService } from "./parceiros.service";
import { Router } from "@angular/router";
import { Parceiro } from "./parceiro";

@Component({
  selector: 'app-parceiros',
  templateUrl: './parceiros.component.html',
  styleUrls: ['./parceiros.component.css']
})
export class ParceirosComponent implements OnInit {

  service : ParceirosService;
  router: Router;

  parceiros : Parceiro[] = [];

  constructor(service : ParceirosService, router: Router) { 
    this.service = service;
    this.router = router;

    service.todos().subscribe(
      lista => {
        this.parceiros = lista;
        console.log(this.parceiros);
      },
      erro => {
        console.log(erro);
      }
    );

  }

  ngOnInit() {
  }

  editar(parceiro : Parceiro) {
    console.log('editar');
    console.log(parceiro);
    
    this.router.navigate(['/parceiros/' + parceiro.id])
  }

}
