import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { APP_BASE_HREF } from '@angular/common';

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { PessoasModule } from "./pessoas/pessoas.module";
import { GlobalModule } from "./global/global.module";
import { ColigadosModule } from "./coligados/coligados.module";
import { ParceirosModule } from "./parceiros/parceiros.module";
import { ManuelCordeiroNetoComponent } from './manuel-cordeiro-neto/manuel-cordeiro-neto.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from "./login/login.service";
import { AppGlobals } from "./global/global";

@NgModule({
  declarations: [
    AppComponent,
    ManuelCordeiroNetoComponent,
    LoginComponent
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
  providers: [LoginService, AppGlobals,
    { provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }