import { Component, OnInit, Input } from '@angular/core';
import { Pessoa } from "../pessoa";

@Component({
  selector: 'app-pessoa-card',
  templateUrl: './pessoa-card.component.html',
  styleUrls: ['./pessoa-card.component.css']
})
export class PessoaCardComponent implements OnInit {

  @Input() pessoaRef : Pessoa;

  constructor() { }

  ngOnInit() {
  }

}
