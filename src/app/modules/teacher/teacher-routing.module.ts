import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherComponent } from './teacher.component';
const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'preview',
        loadChildren: () => import('./modules/preview/preview.module').then(m => m.PreviewModule)
      },
     /* {
        path: 'test',
        loadChildren: () => import('./modules/assignment/assignment.module').then(m => m.AssignmentModule)
      },*/
      {
        path: 'call',
        loadChildren: () => import('./modules/call/call.module').then(m => m.CallModule)
      },
      {
        path: 'scheduler',
        loadChildren: () => import('./modules/schedule/schedule.module').then(m => m.ScheduleModule)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
