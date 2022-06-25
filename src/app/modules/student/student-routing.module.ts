import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student.component';
import {WaitingRoomComponent} from "./components/waiting-room/waiting-room.component";
import {MeetingEndComponent} from "./components/meeting-end/meeting-end.component";
import {RequestRejectedComponent} from "./components/request-rejected/request-rejected.component";
import {CallNotStartedComponent} from "./components/call-not-started/call-not-started.component";

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./components/student-login/student-login.module').then(m => m.StudentLoginModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./components/student-dashboard/student-dashboard.module').then(m => m.StudentDashboardModule)
      },
      {
        path: 'waiting-room',
        component: WaitingRoomComponent
      },
      {
        path: 'meeting-end',
        component: MeetingEndComponent
      },
      {
        path: 'rejected',
        component: RequestRejectedComponent
      },
      {
        path: 'call-not-started',
        component: CallNotStartedComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
