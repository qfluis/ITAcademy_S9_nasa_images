import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavService {
  // TODO: conectar con BD titulo, fecha, foto
  constructor() { }

  // EPIC, NASA, MARS

  favPicture(date:Date, kind:string) {
    console.log(date, kind, "FAV");
  }

  removeFavPicture(date:Date, kind:string) {
    console.log(date, kind, 'UNFAV');
  }

  hasFav(date:Date, kind:string):boolean {
    return true; 
  }

  getFavList(){
    
  }
  /*
  addNasaPicture(){

  }

  removeNasaPicture(){

  }

  addEarthPicture(){

  }

  removeEarthPicture(){

  }

  addMarsPicture(){

  }

  removeMarsPicture(){

  }*/

}
