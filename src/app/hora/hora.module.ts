import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoraComponent } from './hora.component';



@NgModule({
  declarations: [HoraComponent],
  imports: [
    CommonModule
  ],
  exports: [HoraComponent]
})
export class HoraModule { }
