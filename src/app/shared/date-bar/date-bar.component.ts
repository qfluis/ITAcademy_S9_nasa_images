import { Component, ElementRef, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { PictureOfTheDayService } from 'src/app/nasa-picture-of-the-day/picture-of-the-day.service';

@Component({
  selector: 'app-date-bar',
  templateUrl: './date-bar.component.html',
  styleUrls: ['./date-bar.component.scss']
})
export class DateBarComponent implements OnInit {

  date:Date;

  randomDateStart = new Date ("2015-09-01");
  randomDateEnd = new Date();

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
    this.onChangeDate.emit(this.date);
  }

  addDays(increment:number){
    this.date.setDate(this.date.getDate() + increment);
    
    this.inputDate.nativeElement.valueAsDate = this.date ;
    this.dateChanged();
    
  }

  randomDate(){
    const start = this.randomDateStart.getTime();
    const end = this.randomDateEnd.getTime();
    this.date = new Date( start + Math.random() * (end - start));

    this.inputDate.nativeElement.valueAsDate = this.date ;
    this.dateChanged();
  }

}
