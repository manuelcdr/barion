import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() placeholder : string = '';
  @Input() nome : string = 'teste';
  @Input() tipo : string = 'text';
  @Input() classes : string = '';
  @Input() classesContainer : string = '';
  @Input() label : string = '';
  @Input() col : string = '6';
  @Input() labelAtivada : boolean = false;
  @Input() msgSucesso : string = 'show!';
  @Input() msgErro : string = 'ops!';
  @Input() icon : string = '';

  constructor() { }

  ngOnInit() {
  }

}

