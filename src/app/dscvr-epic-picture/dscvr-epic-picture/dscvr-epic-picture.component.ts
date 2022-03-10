import { Component, Input, OnInit, OnChanges, AfterContentInit, SimpleChanges } from '@angular/core';
import { DscvrEpicPictureService, EpicImage } from '../dscvr-epic-picture.service';

@Component({
  selector: 'app-dscvr-epic-picture',
  templateUrl: './dscvr-epic-picture.component.html',
  styleUrls: ['./dscvr-epic-picture.component.scss']
})
export class DscvrEpicPictureComponent implements OnInit, OnChanges, AfterContentInit {

  @Input() date = new Date();
  pictureDate:string = "";

  earthPhotos:string[]=[];

  constructor(
    private dscvrEpicPicture:DscvrEpicPictureService
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterContentInit(): void {
    //this.loadPictureList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPictureList();    
  }

  loadPictureList(){
    this.dscvrEpicPicture.getEarthPicturesOfTheDay(this.date).subscribe(((resp:EpicImage[])=>{
      
      this.pictureDate = resp[0].date.split(" ")[0];
      this.earthPhotos = this.dscvrEpicPicture.getArrayImages(resp);

      // TODO:Peta siempre la primera imagen...
      this.earthPhotos.shift();

    }), (error:any)=>{
      console.log("ERROR NO HAY DATOS DSCVR EPIC");
    });
  }

  imgError( event:any ){
    //console.log(event.target.src);
    event.target.src = "assets/img/epic_error.webp";
  }

  imgLoad( event:any ){
    //console.log(event.target.style.visibility);
    event.target.style.visibility = "visible";
  }

}
