import { Component, EventEmitter, Input, OnInit, ElementRef } from "@angular/core";

@Component({
  selector: "chips",
  //templateUrl: './chips.component.html' 
  template: `
        <div class="chips" materialize="material_chip" [materializeParams]="[autocompleteInit]"></div>
    `
})
export class ChipsComponent implements OnInit {
  autocompleteInit: any;
  
  ngOnInit(): void {
    this.autocompleteInit = {
      autocompleteOptions: {
        data: this.autocompleteParamsData,
        limit: Infinity,
        minLength: 1
      }
    }
  }

  @Input() autocompleteParamsData: object[];



  cons

}