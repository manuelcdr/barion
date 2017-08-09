import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasComponent } from "./pessoas.component";
import { PessoasServices } from "./pessoas.services";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PessoasComponent],
  exports: [PessoasComponent],
  providers: [PessoasServices]
})
export class PessoasModule { }
  