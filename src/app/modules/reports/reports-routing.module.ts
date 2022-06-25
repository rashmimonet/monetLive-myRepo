 import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportsComponent} from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'view-pdf',
        loadChildren: () => import('./modules/spline/spline.module').then( m => m.SplineModule)
      },
      // {
      //   path: 'spline',
      //   loadChildren: () => import('./modules/spline/spline.module').then( m => m.SplineModule)
      // },
      // {
      //   path: 'details',
      //   loadChildren: () => import('./modules/details/details.module').then( m => m.DetailsModule)
      // },
      // This path is used when we click individual user
      {
        path: 'student-detail',
        loadChildren: () => import('./modules/student-detail/student-detail.module').then( m => m.StudentDetailModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
