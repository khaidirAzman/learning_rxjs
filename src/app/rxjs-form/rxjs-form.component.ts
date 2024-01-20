import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {BehaviorSubject, debounceTime, distinctUntilChanged, forkJoin, merge, mergeAll, Observable} from "rxjs";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-rxjs-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './rxjs-form.component.html',
  styleUrl: './rxjs-form.component.css'
})
export class RxjsFormComponent implements OnInit, OnDestroy{
  haveCurrency$ = new BehaviorSubject<string>('USD');
  wantCurrency$ = new BehaviorSubject<string>('EUR');
  amountToExchange$ = new BehaviorSubject<number>(0);
  currency = [
    {name: 'United States Dollar', symbol: 'USD'},
    {name: 'British Pound', symbol: 'GBP'},
    {name: 'Euro', symbol: 'EUR'},
    {name: 'Chinese Yuan', symbol: 'CNY'},
    {name: 'Australian Dollar', symbol: 'AUD'},
    {name: 'South Korean Won', symbol: 'KRW'},
    {name: 'Japanese Yen', symbol: 'JPY'},
    {name: 'Canadian Dollar', symbol: 'CAD'}
  ];
  exchangeData: any = {};
  paramsArray: any[] = [];
  isLoading: boolean = false;
  form = new FormGroup({
    wantCurrency: new FormControl(""),
    haveCurrency: new FormControl(""),
    amount: new FormControl(0)
  });
constructor(private  httpService: HttpService) {
}
performSearch(searchValue:any){
  this.isLoading = true;
  this.paramsArray.push(searchValue);
  if (this.paramsArray.length >= 3){
    console.log('Performing search for:', searchValue);
    let apiArray = [
      this.httpService.getCurrency(
        this.haveCurrency$.getValue(),
        this.wantCurrency$.getValue(),
        this.amountToExchange$.getValue())
    ];
    let $q = forkJoin(apiArray);
    $q.subscribe({
      next: response => {
        this.isLoading = false;
        this.exchangeData = response[0];
      },
      error: err => {
        this.isLoading = false;
        alert('ERROR : '+ err.message);
      },
      complete: () => console.log('Completed')
    })
  }
}

  //emit values amountToExchange$
  search(amount: string){
  this.amountToExchange$.next(Number(amount));
  }
  //emit values wantCurrency$
  wantCurrency(currency: any) {
    this.wantCurrency$.next(String(currency))
  }
  //emit values haveCurrency$
  haveCurrency(currency: any) {
    this.haveCurrency$.next(String(currency))
  }
getValueAmount(event: Event): string {
  return (event.target as HTMLInputElement).value;
}
  ngOnInit(): void {
    let haveCurrencyPipe = this.haveCurrency$.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ),
      wantCurrencyPipe = this.wantCurrency$.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ),
      amountExchangePipe = this.amountToExchange$.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    )
    let combine = merge(haveCurrencyPipe, wantCurrencyPipe, amountExchangePipe);
    combine.subscribe(
      {
        next: response => {
        console.log(response);
          this.performSearch(response);
        },
        error: error => console.log(error.message()),
        complete: () => console.log('Completed')
    })
  }

  ngOnDestroy(): void {
    this.haveCurrency$.complete(); //Observers will automatically be unsubscribed when complete is called
    this.wantCurrency$.complete();
    this.amountToExchange$.complete();
    console.log('Component is destroyed');
  }
}
