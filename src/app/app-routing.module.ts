import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyComponent } from './pages/daily/daily.component';
import { Page404Component } from './pages/page404/page404.component';
import { WeeklyComponent } from './pages/weekly/weekly.component';

const routes: Routes = [
  {path:"", redirectTo:"/daily", pathMatch: 'full'},
  {path:"daily", component:DailyComponent},
  {path:"weekly", component:WeeklyComponent},
  {path:"**", component:Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
