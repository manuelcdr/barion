import { Component, OnInit } from '@angular/core';
import { Coligado } from "./coligado/coligado.component";
import { ColigadosService } from "./coligados.service";
import { Router } from "@angular/router";

@Component({
  selector: 'coligados',
  templateUrl: './coligados.component.html',
  styleUrls: ['./coligados.component.css']
})
export class ColigadosComponent implements OnInit {

  service : ColigadosService;
  router: Router;

  coligados : Coligado[] = [];

  constructor(service : ColigadosService, router: Router) { 
    this.service = service;
    this.router = router;

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

  editar(coligado : Coligado) {
    console.log('editar');
    console.log(coligado);
    
    this.router.navigate(['/coligados/' + coligado.id])
  }

}
