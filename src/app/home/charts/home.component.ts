import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  countries = [];
  highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [
      {
        name: 'Covid-19 Data',
        type: "line",
        data: []
      }
    ],
    title: {
      text: ''
    },
    xAxis:{
      type: 'datetime',
    },
    yAxis: {
      title:{
        text:"Total Cases"
      }
    }
  };

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.countries = this.homeService.getCountries();
  }

}
