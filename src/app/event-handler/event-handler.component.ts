import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {debounceTime, distinctUntilChanged, forkJoin, switchMap} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {FirstLetterUppercasePipe} from "../first-letter-uppercase.pipe";
import {Subject} from "rxjs";

@Component({
  selector: 'app-event-handler',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FirstLetterUppercasePipe
  ],
  templateUrl: './event-handler.component.html',
  styleUrl: './event-handler.component.css'
})
export class EventHandlerComponent implements OnInit, OnDestroy{
  brandInput$ = new Subject<string>();
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
        },
      error:(e) => {
        console.log(e);
        this.isLoading = false;
        },
      complete: () => {
        console.info('Cars data received');
      }
    });
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
  search(brandName: string) {
    this.brandInput$.next(brandName);
  }
  performSearch(searchValue: string) {
    // Perform the actual search operation here
    console.log('Performing search for:', searchValue);
    this.getAllCars(searchValue);
  }
  ngOnInit(){
    this.brandInput$.pipe(
      debounceTime(500),
      distinctUntilChanged() //prevent Observable from emitting same value multiple times in a row
    ).subscribe(searchValue => {
      this.performSearch(searchValue);
    });
  }
  ngOnDestroy() {
    this.brandInput$.complete();
  }
}
