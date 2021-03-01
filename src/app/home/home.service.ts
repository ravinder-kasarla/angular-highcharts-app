import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as countries from './countries.json';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private countriesData: any = (countries as any).default;
  private apiBaseUrl = 'https://api.covid19api.com';

  constructor(
    private http: HttpClient
  ) { }

  getCountries() {
    return this.countriesData;
  }

  getCountryData(data: any) {
    let requestUrl = this.apiBaseUrl + '/country/' + data.country + '/status/' + data.status;
    if (!!data.from && !!data.to) {
      requestUrl += '?from=' + data.from + '&to=' + data.to;
    }
    return this.http.get(requestUrl);
  }
}
