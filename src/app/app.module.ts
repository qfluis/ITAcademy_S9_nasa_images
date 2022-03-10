import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NasaPictureOfTheDayModule } from './nasa-picture-of-the-day/nasa-picture-of-the-day.module';
import { DailyComponent } from './pages/daily/daily.component';
import { WeeklyComponent } from './pages/weekly/weekly.component';
import { Page404Component } from './pages/page404/page404.component';
import { SharedModule } from './shared/shared.module';
import { DscvrEpicPictureModule } from './dscvr-epic-picture/dscvr-epic-picture.module';
import { NasaRoverPhotosModule } from './nasa-rover-photos/nasa-rover-photos.module';

@NgModule({
  declarations: [
    AppComponent,
    DailyComponent,
    WeeklyComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NasaPictureOfTheDayModule,
    DscvrEpicPictureModule,
    NasaRoverPhotosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
