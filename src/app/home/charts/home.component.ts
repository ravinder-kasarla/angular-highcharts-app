import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';

import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  countries = [];
  statuses: {name: string, value: string}[] = [
    {name: 'Total Cases', value: 'confirmed'},
    {name: 'Deaths', value: 'deaths'}
  ];
  duration: {name: string, value: any}[] = [
    {name: 'All time', value: 'all'},
    {name: 'Last 1 week', value: 7},
    {name: 'Last 30 days', value: 30},
    {name: 'Last 3 months', value: 90},
    {name: 'Last 6 months', value: 180}
  ];
  countryCode: string = 'india';
  timeDuration: string = 'all';
  statusType: string = 'confirmed';
  updateFlag: boolean = false;

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
    },
    tooltip: {
      formatter: function() {
        let tooltipText = '<b>' + moment(this.x).format("DD MMM YYYY") + '</b><br/>';
        tooltipText += this.series.yAxis.options.title.text + ': ' + this.y;
        return tooltipText;
      }
    }
  };

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.countries = this.homeService.getCountries();
    this.fetchCountryCovidData();
  }

  fetchCountryCovidData() {
    let params = {
      country: this.countryCode,
      status: this.statusType
    }
    params = Object.assign(params, this.getFromAndToDates());
    this.homeService.getCountryData(params).subscribe(
      (response) => {
        this.handleApiResponse(response);
      }
    );
  }

  getFromAndToDates() {
    let dates = {};
    if (this.timeDuration !== 'all') {
      dates['from'] = moment().subtract(this.timeDuration, 'days').format('YYYY-MM-DD');
      dates['to'] = moment().format('YYYY-MM-DD');
    }
    return dates;
  }

  handleApiResponse(data: any) {
    const chartData = [];
    data.forEach(obj => {
      chartData.push([moment(obj.Date).valueOf(), obj.Cases])
    });
    this.initDataChart({type: 'line', data: chartData});
  }

  initDataChart(chartData: any) {
    this.chartOptions.yAxis = {
      title:{
        text: (this.statusType === 'deaths') ? 'Deaths' : 'Total Cases'
      }
    }
    this.chartOptions.series[0] = {
      name: 'Covid-19 Data',
      type: chartData.type,
      data: chartData.data
    }
    this.updateFlag = true;
  }

  onFilterChange() {
    this.fetchCountryCovidData();
  }

}
