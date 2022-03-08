import { Component, ElementRef, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { PictureOfTheDayService } from 'src/app/nasa-picture-of-the-day/picture-of-the-day.service';

@Component({
  selector: 'app-date-bar',
  templateUrl: './date-bar.component.html',
  styleUrls: ['./date-bar.component.scss']
})
export class DateBarComponent implements OnInit {

  date:Date;
  @Output() onChangeDate = new EventEmitter<Date>();
  @ViewChild('inputDate') inputDate!: ElementRef<HTMLInputElement>;

  constructor(
    private pictureOfTheDayService: PictureOfTheDayService
  ) { 
    this.date = new Date();
    
  }

  ngOnInit(): void {
  }

  dateChanged(){
    this.date = new Date(this.inputDate.nativeElement.value);
    //this.pictureOfTheDayService.date = this.date;
    this.onChangeDate.emit(this.date);
  }

}
