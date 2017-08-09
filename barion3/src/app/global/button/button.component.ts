import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() tipo : string = 'button';
  @Input() nome : string;
  @Input() icon : string;
  @Input() iconOrdenacao : string = 'right';
  @Input() texto : string;


  constructor() { }

  ngOnInit() {
    if (this.texto == '')
      this.texto = this.nome;
  }

}
