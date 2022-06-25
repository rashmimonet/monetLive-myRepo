import { NgModule } from '@angular/core';
import { PieChartComponent } from './pie-chart.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [PieChartComponent],
  imports: [
    SharedModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    CommonModule
  ],
  exports: [PieChartComponent]
})
export class PieChartModule { }
