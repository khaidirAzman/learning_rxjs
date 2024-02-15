import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  count,
  filter, fromEvent,
  interval,
  map,
  max, merge, min,
  Observable,
  of, reduce, startWith,
  timer
} from "rxjs";
import {AsyncPipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css'
})
export class OperatorsComponent implements  OnInit, OnDestroy {
  //Creation
  num$: Observable<number>= of( 4,13,21);
  num2$: Observable<number>= of( 1,16,28);
  mergeNum$ = merge(this.num$, this.num2$);
  timer$ = timer(0,1000); //second timer
  interval$ = interval(1000).pipe(startWith(0)); //second timer
  //Mathematical
  count$ = this.num$.pipe(count());
  max$ = this.num$.pipe(max());
  min$ = this.num$.pipe(min());
  reduce$ = this.num$.pipe(
    reduce((a, x)=> a+x));
  count2$ = this.mergeNum$.pipe(count());
  max2$ = this.mergeNum$.pipe(max());
  min2$ = this.mergeNum$.pipe(min());
  //Filtering
  filter$ = this.mergeNum$.pipe(
    filter(x=> x<5)
  );
  //Transformation
  map$ = this.mergeNum$.pipe(
    map(x=> 2*x)
  );
  reduce2$ = this.mergeNum$.pipe(
    reduce((a, x)=> a+x)
  );
  constructor() {
  }
  ngOnInit(): void {
    this.filter$.subscribe(x=>console.log(x));
  }
  ngOnDestroy(): void {
  }
}
