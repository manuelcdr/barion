import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    InputComponent,
    ButtonComponent
  ],
  exports: [
    InputComponent,
    ButtonComponent
  ],
  providers : [
  ]
})
export class GlobalModule { }
