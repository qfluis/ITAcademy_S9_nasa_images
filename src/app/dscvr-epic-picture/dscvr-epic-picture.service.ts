import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface EpicImage {
  identifier:            string;
  caption:               string;
  image:                 string;
  version:               string;
  centroid_coordinates:  CentroidCoordinates;
  dscovr_j2000_position: J2000Position;
  lunar_j2000_position:  J2000Position;
  sun_j2000_position:    J2000Position;
  attitude_quaternions:  AttitudeQuaternions;
  date:                  string;
  coords:                Coords;
}

export interface AttitudeQuaternions {
  q0: number;
  q1: number;
  q2: number;
  q3: number;
}

export interface CentroidCoordinates {
  lat: number;
  lon: number;
}

export interface Coords {
  centroid_coordinates:  CentroidCoordinates;
  dscovr_j2000_position: J2000Position;
  lunar_j2000_position:  J2000Position;
  sun_j2000_position:    J2000Position;
  attitude_quaternions:  AttitudeQuaternions;
}

export interface J2000Position {
  x: number;
  y: number;
  z: number;
}




@Injectable({
  providedIn: 'root'
})
export class DscvrEpicPictureService {

  private ApiUrl:string = 'https://api.nasa.gov/EPIC/api/natural/date';
  private ImagesUrl:string = "https://epic.gsfc.nasa.gov/archive/natural";
  private ApiKey:string = 'm1miLkIg5G4D7cM0gMZwh3uh4cu0P73I4vodaeWi';  

  constructor(
    private http:HttpClient
  ) { }  
  
  getEarthPicturesOfTheDay (date:Date):Observable<EpicImage[]> {
    let today:Date = new Date();
    today = new Date(this.formatedDate(today));
    date = new Date(this.formatedDate(date));

    let url:string = `${this.ApiUrl}/${this.formatedDate(date)}?api_key=${this.ApiKey}`;
    
    if (date.getTime() == today.getTime()){
      //date.setDate(date.getDate()-1);  
      url = `${this.ApiUrl}?api_key=${this.ApiKey}`;
    } 
      
    
    return this.http.get<EpicImage[]>(url);
  }

  formatedDate(date:Date):string {
    return date.toISOString().split("T")[0];
  }

  formatedDateForImg(date:Date):string {
    let result:string = this.formatedDate(date);
    result = result.replace(/-/g,"/",);
    return result; 
  }

  getArrayImages(images:EpicImage[]):string[]{
    const arrImg:string[] =[];
    for (let img of images){
      arrImg.push(this.getImageUrl(img));
    }
    return arrImg;
  }

  getImageUrl(image:EpicImage){
    const date = new Date(image.date);
    return `${this.ImagesUrl}/${this.formatedDateForImg(date)}/jpg/${image.image}.jpg?api_key=${this.ApiKey}`;
  }  
}
