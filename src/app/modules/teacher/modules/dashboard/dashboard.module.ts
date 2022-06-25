import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {AddEventComponent} from '../schedule/calendar/add-event/add-event.component';
import {AddEventModule} from '../schedule/calendar/add-event/add-event.module';
import {RequestInterceptInterceptor} from '../../../../services/request-intercept.interceptor';

const routes: Routes = [{ path: '', component: DashboardComponent}];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    SharedModule,
    AddEventModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  /*providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptInterceptor,
    multi: true
  }],*/
  entryComponents: [AddEventComponent]
})
export class DashboardModule { }
