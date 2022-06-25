import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {GuardGuard} from './guard.guard';
import {IsLoggedIn} from "./services/auth.service";
import {MonitorComponent} from "./components/monitor/monitor.component";
import {PolicyComponent} from "./components/policy/policy.component";
import {MonetHomePageComponent} from "./components/MonetHomePage/MonetHomePage.component";

const routes: Routes = [
  {
    path: 'student',
    loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule),
    data: {title: 'Monet Live | Student'},
    // canActivate: [GuardGuard]
  },
  {
    path: 'teacher',
    loadChildren: () => import('./modules/teacher/teacher.module').then(m => m.TeacherModule),
    data: {title: 'Monet Live | Teacher'},
    canActivate: [GuardGuard]
  },
  {
    path: 'manager',
    loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule),
    data: {title: 'Monet Live | Manager'},
    // canActivate: [GuardGuard]
  },
  {
    path: 'report',
    loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule),
    data: {title: 'Monet Live | Report'},
    resolve: [IsLoggedIn]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    data: {title: 'Monet Live | Authentication'},
    canActivate: [GuardGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    data: {title: 'Monet Live | Profile'},
  },
  {
    path: 'profile/dashboard',
    redirectTo: '/profile/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
  component: MonetHomePageComponent
  },
  {
    path: 'monitor',
    component: MonitorComponent
  },
  {
    path: 'privacy-policy',
    component: PolicyComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false, onSameUrlNavigation: 'reload', enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
