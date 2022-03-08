import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateBarComponent } from './date-bar/date-bar.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DateBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DateBarComponent
  ]
})
export class SharedModule { }
