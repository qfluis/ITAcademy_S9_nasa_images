import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

export interface User{
  email:    string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  API_URL = "http://localhost:4000/api/auth";

  userLogedIn:string = "";

  constructor(
    private http:HttpClient
  ) { }

  newUser(email:string, password:string){
    const user:User = { email, password };    
    return this.http.post(this.API_URL+"/new", user)
      .pipe(
        tap((resp:any)=>{
          // Si todo ok
          if(resp.ok === true){        
            this.userLogedIn = user.email;
            this.saveToken(resp.token);
          }
        })
      );
  }

  login(email:string, password:string){
    const user = { email, password };
   
    return this.http.post(this.API_URL, user)
      .pipe(
        tap((resp:any)=>{
          // Si todo ok
          if(resp.ok === true){        
            this.userLogedIn = user.email;
            this.saveToken(resp.token);
          }
        })
      );
  }

  logOut(){
      this.userLogedIn = "";
      localStorage.setItem("token","");
  }

  validateToken(){
    const token = this.loadToken();
    const url = this.API_URL + "/renew";
    if(token != undefined && token != ""){
      // Petición http
      let httpHeaders:HttpHeaders =new HttpHeaders()
        .set('x-token',token);
      this.http.get(url,{ 'headers':httpHeaders }).subscribe((resp:any)=>{
        if (resp.ok == true){
          this.userLogedIn = resp.email;
        }
      });
    }
  }

  saveToken(token:string) {
    localStorage.setItem("token",token);
  }

  loadToken():string {
    return localStorage.getItem("token") || "";
  }  
}
