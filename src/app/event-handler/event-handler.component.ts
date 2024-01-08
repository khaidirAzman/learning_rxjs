import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {forkJoin} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-event-handler',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './event-handler.component.html',
  styleUrl: './event-handler.component.css'
})
export class EventHandlerComponent implements OnInit{
  cars: any[] | undefined;
  bestCar:any;
  //loader
  isLoading=false;
  constructor(private httpService:HttpService) {
  }
  addRating(car:any){
    let index = this.cars?.indexOf(car);
    car.rating++;
    if (!this.bestCar){
      this.bestCar = car;
    }
    else if(car.rating > this.bestCar.rating){
      this.bestCar = car;
    }
  }
  getAllCars(brand:string){
    this.isLoading = true;
    let apiArray = [];
    apiArray.push(this.httpService.getCars(brand));

    let $q = forkJoin(apiArray);
    $q.subscribe({
      next:(response:any) => {
        this.isLoading = false;
        this.cars=response[0];
        this.cars?.forEach((car)=>car.rating = 0);
        // this.addObservables();
        },
      error:(e) => {
        console.log(e);
        this.isLoading = false;
        },
      complete: () => {
        console.info('Device data received');
      }
    });
  }

  ngOnInit(){
    // this.getAllCars();
  }
}
