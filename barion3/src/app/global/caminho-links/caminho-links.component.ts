import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-caminho-links',
  templateUrl: './caminho-links.component.html',
  styleUrls: ['./caminho-links.component.css']
})
export class CaminhoLinksComponent implements OnInit {

  @Input() caminhos : CaminhoLink[];

  constructor() { }

  ngOnInit() {
  }

}

export class CaminhoLink {
  nome : string;
  routeLink : string;

  constructor(nome : string, routeLink : string) {
    this.nome = nome;
    this.routeLink = routeLink;
  }
}