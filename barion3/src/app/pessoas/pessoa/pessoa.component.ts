import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class Pessoa {
  id: number;
  nome: string;
  cnpj: string;
  ie: string;
  cidade: string;
  estado: string;
  endereco: string;
  contato: string;
  celular: string;
  telefoneset: string;
  email: string;
  banco: string;
  agencia: string;
  conta: string;
}
