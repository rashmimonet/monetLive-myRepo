import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SplineComponent } from './spline.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import { DashboardService } from '../dashboard/dashboard.service';
import {PieChartModule} from '../pie-chart/pie-chart.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {OverallLineChartModule} from '../overall-line-chart/overall-line-chart.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [{
  path: '', component: SplineComponent,

}];

@NgModule({
  declarations: [SplineComponent],
  imports: [
    CommonModule,
    SharedModule,
    PieChartModule,
    OverallLineChartModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    RouterModule.forChild(routes),
    MatSlideToggleModule,
    MatDialogModule,
  ],
  providers: [DashboardService, DatePipe]
})
export class SplineModule { }
