import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MarsPhotos {
  photos: MarsPhoto[];
}

export interface MarsPhoto {
  id:         number;
  sol:        number;
  camera:     Camera;
  img_src:    string;
  earth_date: string;
  rover:      Rover;
}

export interface Camera {
  id:        number;
  name:      CameraName;
  rover_id:  number;
  full_name: FullName;
}

export enum FullName {
  FrontHazardAvoidanceCamera = "Front Hazard Avoidance Camera",
  MastCamera = "Mast Camera",
  RearHazardAvoidanceCamera = "Rear Hazard Avoidance Camera",
}

export enum CameraName {
  Fhaz = "FHAZ",
  Mast = "MAST",
  Rhaz = "RHAZ",
}

export interface Rover {
  id:           number;
  name:         RoverName;
  landing_date: Date;
  launch_date:  Date;
  status:       Status;
}

export enum RoverName {
  Curiosity = "Curiosity",
}

export enum Status {
  Active = "active",
}


@Injectable({
  providedIn: 'root'
})
export class NasaRoverPhotosService {

  private ApiUrl:string = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
  private ApiKey:string = 'm1miLkIg5G4D7cM0gMZwh3uh4cu0P73I4vodaeWi';  

  constructor(
    private http:HttpClient
  ) { }  

  getMarsPhotos (date:Date):Observable<MarsPhotos> {
    
    let url:string = `${this.ApiUrl}?api_key=${this.ApiKey}&earth_date=${this.formatedDate(date)}&page=1`;
        
    console.log("Mars",url);
    return this.http.get<MarsPhotos>(url);
  }

  formatedDate(date:Date):string {
    return date.toISOString().split("T")[0];
  }
}
