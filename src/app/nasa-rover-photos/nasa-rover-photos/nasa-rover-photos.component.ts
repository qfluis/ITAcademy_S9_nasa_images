import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { FavService } from 'src/app/shared/fav.service';
import { MarsPhoto, MarsPhotos, NasaRoverPhotosService } from '../nasa-rover-photos.service';

@Component({
  selector: 'app-nasa-rover-photos',
  templateUrl: './nasa-rover-photos.component.html',
  styleUrls: ['./nasa-rover-photos.component.scss']
})
export class NasaRoverPhotosComponent implements OnInit, OnChanges {

  apiCalls:number = 0;
  maxApiCalls:number = 5;

  pictureFav:boolean = false;

  @Input() date = new Date();
  @Input() gallery = false;
  @ViewChild('carousel') carousel!:ElementRef<HTMLDivElement>;
  @ViewChild('prev') carouselLeft!:ElementRef<HTMLButtonElement>;
  @ViewChild('next') carouselRight!:ElementRef<HTMLButtonElement>;
  
  pictureDate:string = "";

  roverPhotos:MarsPhoto[]=[];
  
  get userLogedIn(){
    return this.loginService.userLogedIn;
  } 

  constructor(
    private nasaRoverPhotosService:NasaRoverPhotosService,
    private loginService:LoginService,
    private favService:FavService 
  ) { }

  ngOnInit(): void {
  }  

  ngAfterContentInit(): void {    
    if(this.gallery) this.pictureFav = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPictureList();    
  }

  loadPictureList(){

    if(this.gallery) this.date = new Date(this.date);

    this.nasaRoverPhotosService.getMarsPhotos(this.date).subscribe((resp:MarsPhotos)=>{
      if (resp.photos.length > 0) {
        this.roverPhotos = resp.photos;
        this.pictureDate = this.roverPhotos[0].earth_date;
        if (!this.gallery) this.hasFav();
        this.changeCarrouselButtons();

      } else if (this.apiCalls <= this.maxApiCalls){         
        this.date.setDate(this.date.getDate()-1);    
        this.apiCalls ++;   
        this.loadPictureList();
      } else {
        this.apiCalls = 0;
      }

      
      
    },(error:any)=>{
      console.log("Error cargando imagen Rover")
    });
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

  hasFav() {    
    if (this.userLogedIn){
      this.favService.hasFav(new Date(this.pictureDate), "MARS").subscribe((resp:any)=>{
        //console.log("Has fav", resp);
        if(resp.ok == true) {
          this.pictureFav = true;
        } else {
          this.pictureFav = false;
        }
      });
    }    
  }

  favPicture(){    
    if (!this.pictureFav) {
      this.favService.favPicture(new Date(this.pictureDate), 'MARS');  
      this.pictureFav = true;
    } else {
      this.favService.removeFavPicture(new Date(this.pictureDate), 'MARS');
      this.pictureFav = false;
    }
  }

  changeCarrouselButtons(){
    // Arregla bug cuando hay varios carouseles...
    const newId = 'carouselFadeMars'+this.pictureDate;
    this.carousel.nativeElement.setAttribute('id', newId);
    this.carouselLeft.nativeElement.setAttribute('data-bs-target', '#'+newId);
    this.carouselRight.nativeElement.setAttribute('data-bs-target', '#'+newId);
  }
}
