import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize'
import { routing } from './app.routes'

import { AppComponent } from './app.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { ColigadosComponent } from './coligados/coligados.component';
import { ParceirosComponent } from './parceiros/parceiros.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PessoasComponent,
    ColigadosComponent,
    ParceirosComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
