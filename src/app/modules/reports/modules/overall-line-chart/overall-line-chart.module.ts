import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OverallLineChartComponent} from './overall-line-chart.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [OverallLineChartComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [OverallLineChartComponent]

})
export class OverallLineChartModule { }
