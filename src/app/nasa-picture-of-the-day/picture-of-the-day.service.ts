import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateBarComponent } from '../shared/date-bar/date-bar.component';

export interface Picture {
  copyright?:       string;
  date?:            Date;
  explanation?:     string;
  hdurl?:           string;
  media_type?:      string;
  service_version?: string;
  title?:           string;
  url?:             string;
}

@Injectable({
  providedIn: 'root'
})
export class PictureOfTheDayService {

  private _date:Date;
  private ApiUrl:string = 'https://api.nasa.gov/planetary/apod';
  private ApiKey:string = 'm1miLkIg5G4D7cM0gMZwh3uh4cu0P73I4vodaeWi';

  constructor(
    private http:HttpClient
  ) {
    this._date = new Date();
    //console.log(this.date.toISOString());
  }

  getPictureOfTheDay ():Observable<Picture> {
    return this.http.get<Picture>(`${this.ApiUrl}?api_key=${this.ApiKey}`);
  }

  set date(date:Date) {
    this._date = date;
    console.log(this._date);
  }

}

/*
Parameter	  Type	        Default	    Description
date	      YYYY-MM-DD	  today	      The date of the APOD image to retrieve
start_date	YYYY-MM-DD	  none	      The start of a date range, when requesting date for a range of dates. Cannot be used with date.
end_date	  YYYY-MM-DD	  today	      The end of the date range, when used with start_date.
count	      int	          none	      If this is specified then count randomly chosen images will be returned. Cannot be used with date or start_date and end_date.
thumbs	    bool	        False	      Return the URL of video thumbnail. If an APOD is not a video, this parameter is ignored.
api_key	    string	      DEMO_KEY	  api.nasa.gov key for expanded usage
*/