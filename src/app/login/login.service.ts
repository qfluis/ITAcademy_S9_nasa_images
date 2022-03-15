import { Injectable } from '@angular/core';

export interface User{
  name:     string,
  email:    string,
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  // TODO: temporal
  userList:User[] = [
    { name: 'luis', email:'qfluis@gmail.com', password:'123456' }
  ];

  userLogedIn:User | undefined = this.userList[0];

  constructor() { }

  // TODO: implementar register con BACKEND
  newUser(name:string, email:string, password:string){
    const user:User = {name, email, password};
    // enviar petición a backend y devolver feedback...
    // tener en cuenta, si el usuario ya existe.

    // guardar JWT

    // todo ok    
    this.userList.push(user);
    this.userLogedIn = user;

    return true; 
  }

  // TODO: implementar login con BACKEND
  login(email:string, password:string){
    //enviar petición a backend y devolver feedback
    const user = this.userList.find((user)=>{
      return (user.email === email && user.password === password);
    })
    // guardar JWT

    // todo ok
    if(user){
      this.userLogedIn = user;
    }    
  }

  // TODO: implementar logout
  logout(){
      this.userLogedIn = undefined;
  }

}
