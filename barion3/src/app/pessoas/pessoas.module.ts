import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasComponent } from "./pessoas.component";
import { PessoasPipe } from './pessoas.pipe';
import { PessoaComponent } from './pessoa/pessoa.component';
import { PessoasService } from "./pessoas.service";
import { GlobalModule } from "../global/global.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    GlobalModule,
    FormsModule
  ],
  declarations: [
    PessoasComponent, 
    PessoasPipe, 
    PessoaComponent],
  exports: [
    PessoasComponent,
    PessoaComponent
  ],
  providers: [
    PessoasService
  ]
})
export class PessoasModule { }
  