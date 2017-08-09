import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MaterializeAction } from "angular2-materialize/dist";

declare var $: JQueryStatic;

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {



  @ViewChild('buscaPessoa') campoBusca: ElementRef;

  constructor() {
    console.log('construtor');
  }

  ngOnInit(): void {
    console.log(this.campoBusca);
    console.log('passou 1');

    $(document).ready(() => {
      $(this.campoBusca.nativeElement).material_chip();
      console.log('passou');
    });

  }

}
