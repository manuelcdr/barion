import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() col : string = '3';
  @Input() id : string = ''
  @Input() nome : string = '';
  @Input() tipo : string = 'text';
  @Input() validar : boolean = true;
  @Input() classes : string = '';
  @Input() mensagemDeErro : string = '';
  @Input() mensagemDeSucesso : string = '';
  @Input() icon : string = '';
  @Input() placeholder : string = '';
  @Input() label : string = '';
  @Input() ehModel : boolean = true;
   
  constructor() { }

  ngOnInit() {
    if (this.label == '')
      this.label = this.nome.substr(0,1).toUpperCase() + this.nome.substr(1,100);

    if (this.id == '')
      this.id = this.nome;

    if (this.nome == '')
      this.nome = this.id;
  }

}
