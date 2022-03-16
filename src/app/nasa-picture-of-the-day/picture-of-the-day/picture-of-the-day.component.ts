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
  picture:Picture={};
  @ViewChild("pictureContainer") pictureContainer!:ElementRef<HTMLDivElement>;
  @ViewChild("pictureImg") pictureImg!: ElementRef<HTMLImageElement>;
  @ViewChild("videoContainer") videoContainer!:ElementRef<HTMLDivElement>;
  @ViewChild("videoImg") videoImg!: ElementRef<HTMLIFrameElement>;

  pictureFav:boolean = false;  // TODO: comprobar si tiene o no Fav
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

  ngAfterContentInit(): void {
    //console.log("After Content Init");
    this.chargePicture();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("changes");
    this.chargePicture();
  }

  chargePicture(){
    
    //this.pictureImg.nativeElement.hidden = true;
    this.pictureOfTheDay.getPictureOfOneDay(this.date).subscribe((resp:Picture) => {
      //console.log("respuesta", resp);
      this.picture = resp;


            
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

    }, (error:any) => {

      this.picture = {
        title: "Image of the day not available",
        explanation: `${ error.error.msg } Please, try another date.`,
        url: "/assets/img/img_broken.webp",
        media_type: "image"
      }
      this.pictureImg.nativeElement.classList.add("invisible");
      this.pictureImg.nativeElement.src = "/assets/img/img_broken.webp";

    });
  }

  showImage(){
    this.pictureImg.nativeElement.classList.remove("invisible");
  }

  favPicture(){    
    if (!this.pictureFav) {
      this.favService.favPicture(this.date, 'NASA');  
      this.pictureFav = true;
    } else {
      this.favService.removeFavPicture(this.date, 'NASA');
      this.pictureFav = false;
    }
  }
}
