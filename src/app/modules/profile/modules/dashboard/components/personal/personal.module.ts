import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { AccountComponent } from './components/account/account.component';
import { MyMeetingComponent } from './components/my-meeting/my-meeting.component';
import { RecordingComponent } from './components/recording/recording.component';
import { SettingComponent } from './components/setting/setting.component';
import { RouterModule } from '@angular/router';
import {PersonalRoutingModule} from './personal-routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ScheduleMeetingComponent } from './components/my-meeting/sub-components/schedule-meeting/schedule-meeting.component';
import {CalendarsModule} from '../../../../../teacher/modules/schedule/calendar/calendar.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PlanComponent } from './components/plan/plan.component';
import { CardDetailsComponent } from './components/account/cardDetails/cardDetails.component';
import { PaymentcardModule } from 'src/app/modules/paymentcard/paymentcard.module';
import { AssignLicenseComponent } from './components/setting/assign-license/assign-license.component';
import { ReportsComponent } from './components/reports/reports.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {PaginatorComponent} from "../../../../../../components/paginator/paginator.component";
import {MatGridListModule} from "@angular/material/grid-list";
import { StyleDirective } from './components/account/style.directive';


@NgModule({
  declarations: [PersonalComponent, AccountComponent, MyMeetingComponent, RecordingComponent,
     SettingComponent, ScheduleMeetingComponent, PlanComponent, CardDetailsComponent,
     AssignLicenseComponent,
     ReportsComponent, PaginatorComponent, StyleDirective,
     StyleDirective ],

    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        PersonalRoutingModule,
        DragDropModule,
        CalendarsModule,
        MatDividerModule,
        MatTabsModule,
        MatSlideToggleModule,
        PaymentcardModule,
        MatPaginatorModule,
        MatTableModule,
        MatGridListModule,
    ],
  exports: [
    PersonalComponent,
    RecordingComponent,
    ReportsComponent
  ],
  providers: []
})
export class PersonalModule { }