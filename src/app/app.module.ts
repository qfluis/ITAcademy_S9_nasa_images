import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NasaPictureOfTheDayModule } from './nasa-picture-of-the-day/nasa-picture-of-the-day.module';
import { DailyComponent } from './pages/daily/daily.component';
import { Page404Component } from './pages/page404/page404.component';
import { SharedModule } from './shared/shared.module';
import { DscvrEpicPictureModule } from './dscvr-epic-picture/dscvr-epic-picture.module';
import { NasaRoverPhotosModule } from './nasa-rover-photos/nasa-rover-photos.module';
import { LoginModule } from './login/login.module';
import { MyFavouritesComponent } from './pages/my-favourites/my-favourites.component';

@NgModule({
  declarations: [
    AppComponent,
    DailyComponent,
    Page404Component,
    MyFavouritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NasaPictureOfTheDayModule,
    DscvrEpicPictureModule,
    NasaRoverPhotosModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
