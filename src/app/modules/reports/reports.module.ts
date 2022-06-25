import {NgModule} from '@angular/core';
import {ReportsComponent} from './reports.component';
import {SharedModule} from '../shared/shared.module';
import {ReportsRoutingModule} from './reports-routing.module';
import {CallSidnavModule} from '../teacher/modules/call-sidnav/call-sidnav.module';
import {DatePipe} from '@angular/common';
import {SocketService} from '../shared/services/socket.service';
import {ApiService} from '../shared/services/api.service';
import { MatTableModule } from '@angular/material/table';
import {ScriptLoadService} from '../shared/services/script-load.service';
import {CategoryFilterPipe} from '../shared/pipes/category-filter.pipe';
import {TopBarModule} from './modules/top-bar/top-bar.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ReportServiceService } from './report-service.service';
import { AssignmentComponent } from './modules/assignment/assignment.component';

@NgModule({
  declarations: [ReportsComponent, AssignmentComponent, ],
  imports: [
    SharedModule,
    CallSidnavModule,
    ReportsRoutingModule,
    TopBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [DatePipe, SocketService, ApiService, ScriptLoadService, CategoryFilterPipe,ReportServiceService ]
})
export class ReportsModule {
}
