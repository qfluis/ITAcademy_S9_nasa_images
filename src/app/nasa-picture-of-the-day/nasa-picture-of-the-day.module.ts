import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureOfTheDayComponent } from './picture-of-the-day/picture-of-the-day.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    PictureOfTheDayComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    PictureOfTheDayComponent
  ]
})
export class NasaPictureOfTheDayModule { }
