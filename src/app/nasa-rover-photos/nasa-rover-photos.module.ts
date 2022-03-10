import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NasaRoverPhotosComponent } from './nasa-rover-photos/nasa-rover-photos.component';



@NgModule({
  declarations: [
    NasaRoverPhotosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NasaRoverPhotosComponent
  ]
})
export class NasaRoverPhotosModule { }
