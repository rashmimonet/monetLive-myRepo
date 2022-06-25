import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccountComponent} from './components/account/account.component';
import {MyMeetingComponent} from './components/my-meeting/my-meeting.component';
import {RecordingComponent} from './components/recording/recording.component';
import {SettingComponent} from './components/setting/setting.component';
import {ScheduleMeetingComponent} from './components/my-meeting/sub-components/schedule-meeting/schedule-meeting.component';
import {PlanComponent} from './components/plan/plan.component';
import {AssignLicenseComponent} from './components/setting/assign-license/assign-license.component';
import {ReportsComponent} from "./components/reports/reports.component";


const routes: Routes = [
/*  {
    path: '',
    component: AccountComponent,
  },*/
  {
    path: '',
    component: MyMeetingComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'my_meeting',
    component: MyMeetingComponent,
  },
  {
    path: 'my_meeting/schedule',
    component: ScheduleMeetingComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
    // component: RecordingComponent,
  },
  {
    path: 'setting',
    component: SettingComponent,
  },
  {
    path: 'setting/license',
    component: AssignLicenseComponent,
  },
  {
    path: 'plan',
    component: PlanComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
