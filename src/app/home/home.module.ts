import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HomeComponent } from './charts/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
