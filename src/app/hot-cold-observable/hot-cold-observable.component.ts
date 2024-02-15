import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, JsonPipe, NgIf} from "@angular/common";
import {bufferCount, fromEvent, interval, map, Observable, of, share, shareReplay, take, tap, timer} from "rxjs";

@Component({
  selector: 'app-hot-cold-observable',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    JsonPipe
  ],
  templateUrl: './hot-cold-observable.component.html',
  styleUrl: './hot-cold-observable.component.css'
})
export class HotColdObservableComponent implements  OnInit, AfterViewInit{
  @ViewChild('btn') btn: ElementRef | undefined;
  click$ = new Observable();
  ngAfterViewInit(): void {
     this.click$ = fromEvent(this.btn?.nativeElement, 'click').pipe(
       map(() => Math.random()),
       share()
    );
  }
  timer$ = timer(0,1000);
  video$ = interval(1000).pipe(
    tap((x) => console.log('Processing: ', x)),
    map(() => Math.random())
  );
  videoShareReplay$ = interval(1000).pipe(
    tap((x) => console.log('Processing: ', x)),
    map(() => Math.random()),
    shareReplay()
  );
  videoShare$ = interval(1000).pipe(
    tap((x) => console.log('Processing: ', x)),
    map(() => Math.random()),
    share(),
    take(5)
  );
  ngOnInit(){
    // get 3 different values from 3 subscribers
    // this.video$.subscribe(console.log);
    // this.video$.subscribe(console.log);
    // this.video$.subscribe(console.log);
    // // get 3 same values from 3 subscribers
    // this.videoShareReplay$.subscribe(console.log);
    // this.videoShareReplay$.subscribe(console.log);
    // this.videoShareReplay$.subscribe(console.log);
    // setTimeout(
    //   // this subscription arrives late to the party. What will happen?
    //   () => this.videoShare$.subscribe(console.log),
    //   1500
    // );
    // get 3 same values from 3 subscribers
    // this.videoShare$.subscribe(console.log);
    // this.videoShare$.subscribe(console.log);
    // this.videoShare$.subscribe(console.log);
    // setTimeout(
    //   // this subscription arrives late to the party. What will happen?
    //   () => this.videoShare$.subscribe((x)=>console.log('Late :', x)),
    //   2000
    // );
  }
}
