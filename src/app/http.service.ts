import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import $ from 'jquery'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private covid19 = 'https://api.api-ninjas.com/v1/covid19?country=';
  constructor(private http:HttpClient) { }
  getCovidCasesByCountry(country:string) {
    const apiKey = 't0DH9saZ5NNhESuAjCVp8A==hcmojPSVmad46KMG';
    return this.http.get(this.covid19+country,
      {headers:{ 'X-Api-Key': apiKey}});
  }
  getCovidDeathByCountry(country:string) {
    const apiKey = 't0DH9saZ5NNhESuAjCVp8A==hcmojPSVmad46KMG';
    return this.http.get(this.covid19+country+'&type=deaths',
      {headers:{ 'X-Api-Key': apiKey}});
  }
}
