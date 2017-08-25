import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { PessoasModule } from "./pessoas/pessoas.module";
import { GlobalModule } from "./global/global.module";
import { ColigadosModule } from "./coligados/coligados.module";
import { ParceirosModule } from "./parceiros/parceiros.module";
import { ManuelCordeiroNetoComponent } from './manuel-cordeiro-neto/manuel-cordeiro-neto.component';

@NgModule({
  declarations: [
    AppComponent,
    ManuelCordeiroNetoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    PessoasModule,
    GlobalModule,
    ColigadosModule,
    ParceirosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }