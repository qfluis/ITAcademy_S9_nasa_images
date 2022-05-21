import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  get userLogedIn() {
    return this.loginService.userLogedIn;
  }

  constructor(
    private loginService:LoginService,
    private router:Router
  ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.userLogedIn != ""){
      return true;
    } else {
      this.router.navigate(['login-signup']);
      return false;
    }
  }
}