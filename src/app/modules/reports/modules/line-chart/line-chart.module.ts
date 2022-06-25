import { NgModule } from '@angular/core';
import { LineChartComponent } from './line-chart.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [LineChartComponent],
  imports: [
    SharedModule
  ],
  exports: [LineChartComponent]
})
export class LineChartModule { }
