import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Picture, PictureOfTheDayService } from '../picture-of-the-day.service';

@Component({
  selector: 'app-picture-of-the-day',
  templateUrl: './picture-of-the-day.component.html',
  styleUrls: ['./picture-of-the-day.component.scss']
})
export class PictureOfTheDayComponent implements OnInit {

  picture:Picture={};
  @ViewChild("pictureImg") pictureImg!: ElementRef<HTMLImageElement>;

  constructor(
    private pictureOfTheDay:PictureOfTheDayService
  ) { }

  ngOnInit(): void {
    this.pictureOfTheDay.getPictureOfTheDay().subscribe((resp:Picture)=> {
      this.picture = resp;
      this.pictureImg.nativeElement.src = this.picture.url || "/img/img_broken.webp";
    })
  }
}
