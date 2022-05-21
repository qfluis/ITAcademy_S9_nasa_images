import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateBarComponent } from './date-bar/date-bar.component';
import { FormsModule } from '@angular/forms';
import { LikeComponent } from './like/like.component';



@NgModule({
  declarations: [
    DateBarComponent,
    LikeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DateBarComponent,
    LikeComponent
  ]
})
export class SharedModule { }
