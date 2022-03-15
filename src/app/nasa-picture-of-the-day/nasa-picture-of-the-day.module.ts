import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureOfTheDayComponent } from './picture-of-the-day/picture-of-the-day.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PictureOfTheDayComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    PictureOfTheDayComponent
  ]
})
export class NasaPictureOfTheDayModule { }
