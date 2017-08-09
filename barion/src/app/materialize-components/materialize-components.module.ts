import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ChipsComponent } from './chips/chips.component';
import { MaterializeDirective } from "angular2-materialize/dist";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        //InputComponent,
        //AutocompleteComponent,
        MaterializeDirective,
        ChipsComponent
    ],
    exports: [
        //InputComponent,
        //AutocompleteComponent,
        ChipsComponent
    ]
})
export class MaterializeComponentsModule { }