import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DscvrEpicPictureComponent } from './dscvr-epic-picture/dscvr-epic-picture.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DscvrEpicPictureComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DscvrEpicPictureComponent
  ]
})
export class DscvrEpicPictureModule { }
