import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/personal/personal.module').then(m => m.PersonalModule)
      },
      {
        path: 'personal',
        loadChildren: () => import('./components/personal/personal.module').then(m => m.PersonalModule)
      },
      {
        path: 'payCard',
        loadChildren: () => import('src/app/modules/paymentcard/paymentcard.module').then(m => m.PaymentcardModule),
        data: {title: 'Monet Live | PayCard'},
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
