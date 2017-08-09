import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColigadosComponent } from "./coligados.component";
import { ColigadoComponent } from "./coligado/coligado.component";
import { GlobalModule } from "../global/global.module";
import { ColigadosService } from "./coligados.service";
import { FormsModule } from "@angular/forms";
import { ColigadosPipe } from "./coligados.pipe";


@NgModule({
  imports: [
    CommonModule,
    GlobalModule,
    FormsModule
  ],
  declarations: [ 
    ColigadosComponent, 
    ColigadoComponent,
    ColigadosPipe
  ],
  exports: [
    ColigadosComponent,
    ColigadoComponent
  ],
  providers : [
    ColigadosService
  ]
})
export class ColigadosModule { }
