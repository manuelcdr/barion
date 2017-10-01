import { Component, OnInit, Input } from '@angular/core';
import { Pessoa } from "../pessoa";

import * as configJson from 'assets/js/config.json';
import { AppGlobals } from "../../global/global";

@Component({
  selector: 'app-pessoa-card',
  templateUrl: './pessoa-card.component.html',
  styleUrls: ['./pessoa-card.component.css']
})
export class PessoaCardComponent implements OnInit {

  @Input() pessoaRef : Pessoa;
  urlImage : string;

  constructor(globals: AppGlobals) {
    this.urlImage = globals.urlApi + "/pessoas/image/";
  }

  ngOnInit() {
  }

}
