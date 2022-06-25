import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StudentDetailComponent } from './student-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import {LineChartModule} from '../line-chart/line-chart.module';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [{
  path : '',
  component : StudentDetailComponent
}];

@NgModule({
  declarations: [StudentDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    LineChartModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ]
})
export class StudentDetailModule { }
