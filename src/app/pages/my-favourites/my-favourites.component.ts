import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { FavService } from '../../shared/fav.service';


@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.scss']
})
export class MyFavouritesComponent implements OnInit {

  favList:any [] = [] // TODO: tipar
  get email() {
    return this.loginService.userLogedIn;
  }


  constructor(
    private favService:FavService,
    private loginService:LoginService
  ) { }

  ngOnInit(): void {
    // TODO: ARREGLAR (espera 500ms a login para obtener lista de Favs)
    if(this.email){
      this.getFavList();
    } else {
      setTimeout(()=>{
        this.getFavList();
      }, 500);
    }
    
  }

  getFavList() {
    this.favService.getFavList().subscribe((resp:any)=>{
      this.favList = resp.data;
      console.log(this.favList);
    });
  }

}
