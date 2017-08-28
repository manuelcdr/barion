import { Component } from '@angular/core';

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngAfterViewInit() {

    $(document).ready(() => {
      $('.button-collapse').sideNav({ menuWidth: 250 });
    });

  }

}
