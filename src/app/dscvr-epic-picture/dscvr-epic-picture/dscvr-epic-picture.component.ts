import { Component, Input, OnInit, OnChanges, AfterContentInit, SimpleChanges } from '@angular/core';
import { DscvrEpicPictureService, EpicImage } from '../dscvr-epic-picture.service';
import { LoginService } from '../../login/login.service';
import { FavService } from '../../shared/fav.service';

@Component({
  selector: 'app-dscvr-epic-picture',
  templateUrl: './dscvr-epic-picture.component.html',
  styleUrls: ['./dscvr-epic-picture.component.scss']
})
export class DscvrEpicPictureComponent implements OnInit, OnChanges, AfterContentInit {

  @Input() date = new Date();
  pictureDate:string = "";
  pictureFav:boolean = false;  // TODO: comprobar si tiene o no Fav
  get userLogedIn(){
    return this.loginService.userLogedIn;
  } 

  earthPhotos:string[]=[];

  constructor(
    private dscvrEpicPicture:DscvrEpicPictureService,
    private loginService:LoginService,
    private favService:FavService
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

      // Peta siempre la primera imagen...
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

  favPicture(){
    
    if (!this.pictureFav) {
      this.favService.favPicture(this.date, 'EPIC');  
      this.pictureFav = true;
    } else {
      this.favService.removeFavPicture(this.date, 'EPIC');
      this.pictureFav = false;
    }

  }

}
