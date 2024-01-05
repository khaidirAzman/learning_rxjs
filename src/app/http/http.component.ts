import { Component } from '@angular/core';
import {HttpService} from "../http.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NgxChartsModule} from "@swimlane/ngx-charts";

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

export class HttpComponent {
  covid: any | undefined;
  covidCases: any[] | undefined;
  chartCovidCases: any[] | undefined;
  noDataToDisplay = '';

// options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'New cases';
  constructor(private  httpService: HttpService) {}
  ngOnInit() {
  }

  //This deprecation was introduced in RxJS 6.4.
  // this.httpService.getPosts().subscribe(
  //   (response) => { this.posts = response; },
  //   (error) => { console.log(error); });
  getCovidInfo(country:string){
    this.httpService.getCovidByCountry(country)
      .subscribe({
        next:(response:any) => {
          if (response.length > 0){
            this.covid = response[0];
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
          } else {
            this.noDataToDisplay = 'No data to display...';
          }
        },
        error: (e) => {console.error(e);alert(e.message)},
        complete: () => console.info('Covid data for ' +country+' received')
      })
  }
}
