import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {HttpComponent} from "./http/http.component";
import {NgModule} from "@angular/core";
import {EventHandlerComponent} from "./event-handler/event-handler.component";
import {RxjsFormComponent} from "./rxjs-form/rxjs-form.component";
import {OperatorsComponent} from "./operators/operators.component";
import {HotColdObservableComponent} from "./hot-cold-observable/hot-cold-observable.component";

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'http', component:HttpComponent},
  {path: 'event', component:EventHandlerComponent},
  {path: 'operators', component:OperatorsComponent},
  {path: 'form', component:RxjsFormComponent},
  {path: 'hotColdObservable', component:HotColdObservableComponent},
  {path: '**', component:HomeComponent} //wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
