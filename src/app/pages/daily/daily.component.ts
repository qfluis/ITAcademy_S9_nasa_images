import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {

  constructor() { }

  date:Date = new Date();


  ngOnInit(): void {
  }

  updateDate( date:Date){
    this.date = date;  
    //console.log("Evento", this.date);
  }  

}
