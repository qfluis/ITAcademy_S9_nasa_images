import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NasaRoverPhotosComponent } from './nasa-rover-photos/nasa-rover-photos.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NasaRoverPhotosComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NasaRoverPhotosComponent
  ]
})
export class NasaRoverPhotosModule { }
