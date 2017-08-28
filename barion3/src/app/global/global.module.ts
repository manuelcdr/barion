import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from './button/button.component';
import { ContainerInputComponent } from './container-input/container-input.component';
import { CaminhoLinksComponent } from './caminho-links/caminho-links.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InputComponent,
    ButtonComponent,
    ContainerInputComponent,
    CaminhoLinksComponent,
    LoaderComponent,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    CaminhoLinksComponent,
    ContainerInputComponent,
    LoaderComponent
  ],
  providers: []
})
export class GlobalModule {}
