import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {HttpComponent} from "./http/http.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'http', component:HttpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: []
})
export class AppRoutes {}
