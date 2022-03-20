import { Component, Input, OnInit, OnChanges, AfterContentInit, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DscvrEpicPictureService, EpicImage } from '../dscvr-epic-picture.service';
import { LoginService } from '../../login/login.service';
import { FavService } from '../../shared/fav.service';

@Component({
  selector: 'app-dscvr-epic-picture',
  templateUrl: './dscvr-epic-picture.component.html',
  styleUrls: ['./dscvr-epic-picture.component.scss']
})
export class DscvrEpicPictureComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit {

  @Input() date = new Date();
  @Input() gallery = false;
  @ViewChild('carousel') carousel!:ElementRef<HTMLDivElement>;
  @ViewChild('prev') carouselLeft!:ElementRef<HTMLButtonElement>;
  @ViewChild('next') carouselRight!:ElementRef<HTMLButtonElement>;
  pictureDate:string = "";
  pictureFav:boolean = false;
  
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

    if(this.gallery) this.pictureFav = true;    
  }
  ngAfterViewInit(): void {
       
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPictureList();    
  }

  loadPictureList(){
    if(this.gallery) this.date = new Date(this.date);
    this.dscvrEpicPicture.getEarthPicturesOfTheDay(this.date).subscribe(((resp:EpicImage[])=>{
      if(resp[0].date){
        this.pictureDate = resp[0].date.split(" ")[0];
        this.earthPhotos = this.dscvrEpicPicture.getArrayImages(resp);

        // Peta siempre la primera imagen...
        this.earthPhotos.shift();

        if (!this.gallery) this.hasFav();
        this.changeCarrouselButtons(); 
      }
      

    }), (error:any)=>{
      console.log("ERROR NO HAY DATOS DSCVR EPIC");
    });

    //if (!this.gallery) this.hasFav();

  }

  imgError( event:any ){
    //console.log(event.target.src);
    event.target.src = "assets/img/epic_error.webp";
  }

  imgLoad( event:any ){
    //console.log(event.target.style.visibility);
    event.target.style.visibility = "visible";
  }

  hasFav() {
    
    if (this.userLogedIn && this.pictureDate != ""){
      this.favService.hasFav(new Date(this.pictureDate), "EPIC").subscribe((resp:any)=>{
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
      this.favService.favPicture(new Date(this.pictureDate), 'EPIC');  
      this.pictureFav = true;
    } else {
      this.favService.removeFavPicture(new Date(this.pictureDate), 'EPIC');
      this.pictureFav = false;
    }

  }

  changeCarrouselButtons(){
    // Arregla bug cuando hay varios carouseles...
    const newId = 'carouselFade'+this.pictureDate;
    this.carousel.nativeElement.setAttribute('id', newId);
    this.carouselLeft.nativeElement.setAttribute('data-bs-target', '#'+newId);
    this.carouselRight.nativeElement.setAttribute('data-bs-target', '#'+newId);
  }

}
