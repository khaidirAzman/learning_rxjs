import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {HttpComponent} from "./http/http.component";
import {NgModule} from "@angular/core";
import {EventHandlerComponent} from "./event-handler/event-handler.component";
import {StateManagementComponent} from "./state-management/state-management.component";
import {RxjsFormComponent} from "./rxjs-form/rxjs-form.component";

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'http', component:HttpComponent},
  {path: 'event', component:EventHandlerComponent},
  {path: 'state', component:StateManagementComponent},
  {path: 'form', component:RxjsFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
