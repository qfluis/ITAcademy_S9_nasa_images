import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  ultimoError:string = "";

  constructor(
    private _builder:FormBuilder,
    private loginService:LoginService,
    private router:Router
  ) {
    this.loginForm = this._builder.group({
      userEmail: ['', Validators.compose([Validators.required, Validators.email])],
      userPass: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  loginMode:boolean = true;

  ngOnInit(): void {
  }

  switchMode(){
    this.loginMode = !this.loginMode;
    this.ultimoError ='';
  }

  // TODO: refactorizar
  sendForm(values:any) {
    if(this.loginMode){
      const respuesta = this.loginService.login(values.userEmail, values.userPass);
      respuesta.subscribe((resp:any)=>{
        console.log("componente", resp);
        // Si todo ok
        if(resp.ok === true){        
          this.router.navigate(["/"]);
        } else {
          this.ultimoError = resp.msg;
        }
      })
      
    } else {
      const respuesta = this.loginService.newUser(values.userEmail, values.userPass);
      respuesta.subscribe((resp:any)=>{
        console.log("componente", resp);
        // Si todo ok
        if(resp.ok === true){        
          this.router.navigate(["/"]);
        } else {
          this.ultimoError = resp.msg;
        }
      })
    }
    // TODO: Mostrar error en login servidor



    //console.log(this.loginMode?"login":"signup", values);
  }

}
