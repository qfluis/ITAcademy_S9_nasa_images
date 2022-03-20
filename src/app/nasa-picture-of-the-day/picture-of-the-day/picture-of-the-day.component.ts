import { AfterContentInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { FavService } from 'src/app/shared/fav.service';
import { Picture, PictureOfTheDayService } from '../picture-of-the-day.service';

@Component({
  selector: 'app-picture-of-the-day',
  templateUrl: './picture-of-the-day.component.html',
  styleUrls: ['./picture-of-the-day.component.scss']
})
export class PictureOfTheDayComponent implements OnInit, OnChanges, AfterContentInit {

  @Input() date = new Date();
  @Input() gallery = false;
  picture:Picture={};
  @ViewChild("pictureContainer") pictureContainer!:ElementRef<HTMLDivElement>;
  @ViewChild("pictureImg") pictureImg!: ElementRef<HTMLImageElement>;
  @ViewChild("videoContainer") videoContainer!:ElementRef<HTMLDivElement>;
  @ViewChild("videoImg") videoImg!: ElementRef<HTMLIFrameElement>;

  pictureFav:boolean = false;
  pictureDate:string = "";



  get userLogedIn(){
    return this.loginService.userLogedIn;
  } 

  constructor(
    private pictureOfTheDay:PictureOfTheDayService,
    private loginService:LoginService,
    private favService:FavService 
  ) { }

  ngOnInit(): void {
    //this.chargePicture();
  }

  ngAfterContentInit() {
    //this.chargePicture();
    // TODO: ARREGLAR, espero 500 ms a que se haya cargado el usuario...
    /*
    if(!this.gallery){
      setTimeout(() => this.hasFav(), 500);
    } else {
      this.pictureFav = true;
    }*/
    if(this.gallery) this.pictureFav = true;
    
  
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.chargePicture();
  }

  chargePicture(){
    
    //this.pictureImg.nativeElement.hidden = true;
    if(this.gallery) this.date = new Date(this.date);

    this.pictureOfTheDay.getPictureOfOneDay(this.date).subscribe((resp:Picture) => {
      this.picture = resp;
      this.pictureDate = resp.date || "";
            
      if (this.picture.media_type == 'image') {
        this.pictureImg.nativeElement.classList.add("invisible");
        this.pictureImg.nativeElement.src = this.picture.url || "/assets/img/img_broken.webp";

        this.pictureContainer.nativeElement.classList.remove("d-none");
        this.videoContainer.nativeElement.classList.add("d-none");
      } else {
        this.videoImg.nativeElement.src = this.picture.url || "/assets/img/img_broken.webp";

        this.videoContainer.nativeElement.classList.remove("d-none");
        this.pictureContainer.nativeElement.classList.add("d-none");       
      }  
      if (!this.gallery) this.hasFav();

    }, (error:any) => {
      this.pictureDate = "";
      this.picture = {
        title: "Image of the day not available",
        date: "",
        explanation: `${ error.error.msg } Please, try another date.`,
        url: "/assets/img/img_broken.webp",
        media_type: "image"
      }
      this.pictureImg.nativeElement.classList.add("invisible");
      this.pictureImg.nativeElement.src = "/assets/img/img_broken.webp";

    });
    
  }

  hasFav() {
    
    if (this.userLogedIn){
      this.favService.hasFav(new Date(this.pictureDate), "NASA").subscribe((resp:any)=>{
        //console.log("Has fav", resp);
        if(resp.ok == true) {
          this.pictureFav = true;
        } else {
          this.pictureFav = false;
        }
      });
    }
    
  }

  showImage(){
    this.pictureImg.nativeElement.classList.remove("invisible");
  }

  favPicture(){    
    if (!this.pictureFav) {
      this.favService.favPicture(new Date(this.pictureDate), 'NASA');  
      this.pictureFav = true;
    } else {
      this.favService.removeFavPicture(new Date(this.pictureDate), 'NASA');
      this.pictureFav = false;
    }
  }
}
