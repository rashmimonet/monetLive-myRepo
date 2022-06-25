import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import {SharedModule} from '../../../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {CalendarsModule} from './calendar/calendar.module';
import {MatListModule} from '@angular/material/list';
import {BrowserModule} from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
const routes: Routes = [{ path: '', component: ScheduleComponent}];

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatDividerModule,
    CalendarsModule,
    MatListModule,
    MatTabsModule
  ]
})
export class ScheduleModule { }
