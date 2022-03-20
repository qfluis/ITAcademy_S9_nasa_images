import { HttpClient } from '@angular/common/http';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class FavService { 

  apiUrl = 'http://localhost:4000/api/like';

  get email() {
    return this.loginService.userLogedIn;
  }

  constructor(
    private loginService:LoginService,
    private http:HttpClient
  ) { }

  // EPIC, NASA, MARS

  favPicture(date:Date, type:string) {
    console.log(date, type, "FAV");
    
    const like = {
      "publishDate": date.toISOString().split("T")[0],
      "type": type,
      "email": this.email
    }
    this.http.post(this.apiUrl+'/new', like).subscribe((resp:any)=>{
        // TODO: ¿Gestionar si no funciona Backend?
    });
  }

  removeFavPicture(date:Date, type:string) {
    //console.log(date, type, 'UNFAV');

    const like = {
      "publishDate": date.toISOString().split("T")[0],
      "type": type,
      "email": this.email
    }

    this.http.post(this.apiUrl+'/remove', like).subscribe((resp:any)=>{
        // TODO: ¿Gestionar si no funciona Backend?
    });
  }

  hasFav(date:Date, type:string) {    
    //console.log(date, type, "¿has fav?");
    
    const like = {
      "publishDate": date.toISOString().split("T")[0],
      "type": type,
      "email": this.email
    }

    return this.http.post(this.apiUrl+'/haslike', like);
  }

  getFavList(){
    //console.log("Fav List", this.email);
    
    const search = {
      "email": this.email
    }

    return this.http.post(this.apiUrl+'/list', search);
  }
}
