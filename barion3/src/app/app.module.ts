import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { PessoasModule } from "./pessoas/pessoas.module";
import { ColigadosComponent } from './coligados/coligados.component';
import { ParceirosComponent } from './parceiros/parceiros.component';
import { ColigadoComponent } from './coligados/coligado/coligado.component';
import { GlobalModule } from "./global/global.module";
import { ColigadosModule } from "./coligados/coligados.module";

@NgModule({
  declarations: [
    AppComponent,
    ParceirosComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    PessoasModule,
    GlobalModule,
    ColigadosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }