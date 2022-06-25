import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagerComponent} from './manager.component';
import {MeetingListComponent} from './components/meeting-list/meeting-list.component';
import {ManagerVideoComponent} from './components/manager-video/manager-video.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: 'meeting-list',
        loadChildren: () => import('./components/meeting-list/meeting-list.module').then(m => m.MeetingListModule),
      },
      {
        path: 'inspect',
        loadChildren: () => import('./components/manager-video/manager-video.module').then(m => m.ManagerVideoModule)
      },
      {
        path: '',
        redirectTo: 'meeting-list',
        pathMatch: 'full'
      },
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
