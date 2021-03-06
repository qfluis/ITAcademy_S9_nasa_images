import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { DailyComponent } from './pages/daily/daily.component';
import { MyFavouritesComponent } from './pages/my-favourites/my-favourites.component';
import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [
  { path:"", redirectTo:"/daily", pathMatch: 'full' },
  { path:"daily", component:DailyComponent },
  { path:"myfavourites", canActivate:[AuthGuard], component:MyFavouritesComponent },
  { path:"login-signup", component:LoginPageComponent },
  { path:"**", component:Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
