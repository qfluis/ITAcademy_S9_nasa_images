import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MarsPhoto, MarsPhotos, NasaRoverPhotosService } from '../nasa-rover-photos.service';

@Component({
  selector: 'app-nasa-rover-photos',
  templateUrl: './nasa-rover-photos.component.html',
  styleUrls: ['./nasa-rover-photos.component.scss']
})
export class NasaRoverPhotosComponent implements OnInit, OnChanges {

  apiCalls:number = 0;
  maxApiCalls:number = 5;

  constructor(
    private nasaRoverPhotosService:NasaRoverPhotosService
  ) { }

  ngOnInit(): void {
  }

  @Input() date = new Date();
  
  pictureDate:string = "";

  roverPhotos:MarsPhoto[]=[];

  

  ngAfterContentInit(): void {
    //this.loadPictureList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPictureList();    
  }

  loadPictureList(){

    this.nasaRoverPhotosService.getMarsPhotos(this.date).subscribe((resp:MarsPhotos)=>{
      if (resp.photos.length > 0) {
        this.roverPhotos = resp.photos;
        this.pictureDate = this.roverPhotos[0].earth_date;
      } else if (this.apiCalls <= this.maxApiCalls){         
        this.date.setDate(this.date.getDate()-1);    
        this.apiCalls ++;   
        this.loadPictureList();
      } else {
        this.apiCalls = 0;
      }
      
    })
  }

  imgError( event:any ){
    //console.log(event.target.src);
    event.target.src = "assets/img/epic_error.webp";
    // TODO: personalizar imagen error
  }

  imgLoad( event:any ){
    //console.log(event.target.style.visibility);
    event.target.style.visibility = "visible";
  }



}
