import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-http',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    NgxChartsModule
  ],
  providers: [],
  templateUrl: './http.component.html',
  styleUrl: './http.component.css'
})

export class HttpComponent implements OnInit, OnDestroy{
  covid: any | undefined;
  covidCases: any[] | undefined;
  chartCovidCases: any[] | undefined;

  covidDeath: any | undefined;
  covidDeathCases: any[] | undefined;
  chartCovidDeath: any[] | undefined;
  noDataToDisplay = '';
// options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;

  //loader
  isLoading=false;
  constructor(private  httpService: HttpService) {}
  ngOnInit() {
  }
  ngOnDestroy() {
  }
  //This deprecation was introduced in RxJS 6.4.
  // this.httpService.getPosts().subscribe(
  //   (response) => { this.posts = response; },
  //   (error) => { console.log(error); });
  getCovidInfo(country:string){
    this.isLoading = true;
    const getCases = this.httpService.getCovidCasesByCountry(country);
    const getDeaths = this.httpService.getCovidDeathByCountry(country);
    let $q=forkJoin([getCases,getDeaths]); //group 2 HTTP calls together

    $q.subscribe({
        next:(response:any) => {
          this.isLoading = false;
          let isCasesEmpty = !!response[0][0].cases;
          let isDeathEmpty = !!response[1][0].deaths;
          if (response.length > 0){
            this.covid = response[0][0];
            this.covidDeath = response[1][0];
            if(isCasesEmpty){
              //cases
              let caseObject = this.covid.cases;
              let casesKey = Object.keys(caseObject);
              let tempCovidCases = [];
              let chartCovidCases = [];

              for(let i=0;i<casesKey.length;i++){
                let tempCase = {"date":casesKey[i],"new":0,"total":0};
                let chartCase = {"name":casesKey[i],"value":0};
                //for table
                tempCase.new = caseObject[casesKey[i]].new;
                tempCase.total = caseObject[casesKey[i]].total;
                tempCovidCases?.push(tempCase);
                //for chart
                chartCase.value = caseObject[casesKey[i]].new;
                chartCovidCases?.push(chartCase);
              }
              this.covidCases = tempCovidCases;
              this.chartCovidCases = chartCovidCases;
            }

            if(isDeathEmpty){
              //deaths
              let deathCaseObject = this.covidDeath.deaths;
              let deathCasesKey = Object.keys(deathCaseObject);
              let tempCovidDeath = [];
              let chartCovidDeathLocal = [];

              for(let i=0;i<deathCasesKey.length;i++){
                let tempDeathCase = {"date":deathCasesKey[i],"new":0,"total":0};
                let chartDeathCase = {"name":deathCasesKey[i],"value":0};
                //for table
                tempDeathCase.new = deathCaseObject[deathCasesKey[i]].new;
                tempDeathCase.total = deathCaseObject[deathCasesKey[i]].total;
                tempCovidDeath?.push(tempDeathCase);
                //for chart
                chartDeathCase.value = deathCaseObject[deathCasesKey[i]].new;
                chartCovidDeathLocal?.push(chartDeathCase);
              }
              this.covidDeathCases = tempCovidDeath;
              this.chartCovidDeath = chartCovidDeathLocal;
            }
            if(!isCasesEmpty && !isDeathEmpty){
              this.noDataToDisplay = 'No data to display...';
            }
          } else {
            this.noDataToDisplay = 'No data to display...';
          }
        },
        error: (e) => {
          console.error(e);
          alert(e.message);
          this.isLoading = false;
          },
        complete: () => {
          console.info('Covid data for ' +country+' received');
        }
      })
  }
}
