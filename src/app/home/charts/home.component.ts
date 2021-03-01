import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {}

}
