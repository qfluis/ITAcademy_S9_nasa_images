import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User{
  email:    string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  API_URL = "http://localhost:4000/api/auth";

  userLogedIn:User | undefined;// = { email:'qfluis@gmail.com', password:'123456' }

  constructor(
    private http:HttpClient
  ) { }

  // TODO: implementar register con BACKEND
  newUser(email:string, password:string){
    const user:User = { email, password };
    const respuesta = this.http.post(this.API_URL+"/new", user);

    respuesta.subscribe((resp:any) => {
      console.log("servicio",resp); 
      // Si todo ok
      if(resp.ok === true){        
        this.userLogedIn = user;
        this.saveToken(resp.token);
      }
    });
    
    return respuesta;



    // enviar petición a backend y devolver feedback...
    // tener en cuenta, si el usuario ya existe.

    // guardar JWT

    // todo ok
  }

  login(email:string, password:string){
    //enviar petición a backend
    const user = { email, password };
   
    const respuesta = this.http.post(this.API_URL, user);

    respuesta.subscribe((resp:any) => {
      console.log("servicio",resp); 
      // Si todo ok
      if(resp.ok === true){        
        this.userLogedIn = user;
        this.saveToken(resp.token);
      }
    });
    
    return respuesta;
  }

  // TODO: comprobar Logout ok
  logout(){
      this.userLogedIn = undefined;
      localStorage.setItem("token","");
  }

  validateToken(){
    // TODO: al iniciar app validar token guardado y hacer login si es correcto
  }

  // TODO: Save Token
  saveToken(token:string) {
    localStorage.setItem("token",token);
  }

  // TODO: Load Token
  loadToken():string {
    return localStorage.getItem("token") || "";
  }

}
