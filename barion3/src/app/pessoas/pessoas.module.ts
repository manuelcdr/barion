import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasComponent } from "./pessoas.component";
import { PessoasPipe } from './pessoas.pipe';
import { PessoaComponent } from './pessoa/pessoa.component';
import { PessoasService } from "./pessoas.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PessoasComponent, PessoasPipe, PessoaComponent],
  exports: [PessoasComponent],
  providers: [PessoasService]
})
export class PessoasModule { }
  