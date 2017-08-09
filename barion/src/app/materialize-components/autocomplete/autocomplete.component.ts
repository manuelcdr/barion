import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
    selector: "autocomplete-chips",
    template: `
        <div class="chips" materialize="material_chip" [materializeParams]="[autocompleteInit]"></div>
    `
})
export class AutocompleteComponent {

  autocompleteInit = {
    autocompleteOptions: {
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': null
      },
      limit: Infinity,
      minLength: 1
    }
  }


}