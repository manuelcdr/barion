import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParceirosPipe } from './parceiros.pipe';
import { GlobalModule } from "../global/global.module";
import { FormsModule } from "@angular/forms";
import { ParceiroComponent } from "./parceiro/parceiro.component";
import { ParceirosComponent } from "./parceiros.component";
import { ParceirosService } from "./parceiros.service";

@NgModule({
  imports: [
    CommonModule,
    GlobalModule,
    FormsModule
  ],
  declarations: [
    ParceirosPipe,
    ParceiroComponent,
    ParceirosComponent,
    ParceirosPipe
  ],
  exports: [
    ParceiroComponent,
    ParceirosComponent
  ],
  providers: [
    ParceirosService
  ]
})
export class ParceirosModule { }
