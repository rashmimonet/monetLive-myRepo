import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {PieChartModule} from '../pie-chart/pie-chart.module';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../../../shared/shared.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {OverallLineChartModule} from '../overall-line-chart/overall-line-chart.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {DashboardService} from "./dashboard.service";

const routes: Routes = [{ path: '', component: DashboardComponent}];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    PieChartModule,
    OverallLineChartModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    RouterModule.forChild(routes),
    MatSlideToggleModule,
  ],
  providers: [DashboardService]
})
export class DashboardModule { }
