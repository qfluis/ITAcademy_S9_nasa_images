import { AfterContentInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Picture, PictureOfTheDayService } from '../picture-of-the-day.service';

@Component({
  selector: 'app-picture-of-the-day',
  templateUrl: './picture-of-the-day.component.html',
  styleUrls: ['./picture-of-the-day.component.scss']
})
export class PictureOfTheDayComponent implements OnInit, OnChanges, AfterContentInit {

  @Input() date = new Date();
  picture:Picture={};
  @ViewChild("pictureImg") pictureImg!: ElementRef<HTMLImageElement>;

  constructor(
    private pictureOfTheDay:PictureOfTheDayService
  ) { }

  ngOnInit(): void {
    //this.chargePicture();
  }

  ngAfterContentInit(): void {
    this.chargePicture();
    //this.pictureImg.nativeElement.src = "/assets/img/loading-gif.gif";
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.chargePicture();
    //console.log(this.date);
  }

  chargePicture(){
    
    //this.pictureImg.nativeElement.hidden = true;
    this.pictureOfTheDay.getPictureOfOneDay(this.date).subscribe((resp:Picture)=> {
      this.picture = resp;
      this.pictureImg.nativeElement.src = "/assets/img/loading-gif.gif";
      console.log("preload", this.picture.url);
      
      this.pictureImg.nativeElement.classList.add("invisible");
      

      //this.preload(this.picture.url || "/assets/img/img_broken.webp");
      this.pictureImg.nativeElement.src = this.picture.url || "/assets/img/img_broken.webp";

    });
  }

  showImage(){
    this.pictureImg.nativeElement.classList.remove("invisible");
    console.log("cargada");
  }

  /*
  preload(url:string) {
    fetch(url).then(request => request.blob()).then(() => {
      this.pictureImg.nativeElement.src = url;
      console.log("img cargada");
    });
  }
  */

}
