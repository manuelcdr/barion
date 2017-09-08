import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from './button/button.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ButtonComponent,
    LoaderComponent,
  ],
  exports: [
    ButtonComponent,
    LoaderComponent
  ],
  providers: []
})
export class GlobalModule {}
