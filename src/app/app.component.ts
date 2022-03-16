import { Component, OnChanges, OnInit, AfterContentInit } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get userLogedIn(){
    return this.loginService.userLogedIn;
  }

  constructor(
    private loginService:LoginService
  ){
    this.loginService.validateToken();
  }

}
