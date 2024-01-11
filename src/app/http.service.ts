import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private covid19 = 'https://api.api-ninjas.com/v1/covid19?country=';
  private cars = 'https://api.api-ninjas.com/v1/cars?limit=3&model=';
  constructor(private http:HttpClient) { }
  apiKeyNinja = 't0DH9saZ5NNhESuAjCVp8A==hcmojPSVmad46KMG';
  getCovidCasesByCountry(country:string) {
    return this.http.get(this.covid19+country,
      {headers:{ 'X-Api-Key': this.apiKeyNinja}});
  }
  getCovidDeathByCountry(country:string) {
    return this.http.get(this.covid19+country+'&type=deaths',
      {headers:{ 'X-Api-Key': this.apiKeyNinja}});
  }

  getCars(brand:string) {
    return this.http.get(this.cars+brand,
      {headers:{ 'X-Api-Key': this.apiKeyNinja}});
  }
}
