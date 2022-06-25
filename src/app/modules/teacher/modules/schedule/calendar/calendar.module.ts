import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import {SharedModule} from '../../../../shared/shared.module';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import {MatDialogModule} from '@angular/material/dialog';
import {DateAdapter} from 'angular-calendar/date-adapters/esm/date-adapter';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CalendarModule} from 'angular-calendar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {AddEventComponent} from './add-event/add-event.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {DurationPipe} from '../../../../../pipes/duration.pipe';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {HttpClientModule} from '@angular/common/http';
import {AddEventModule} from './add-event/add-event.module';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    AddEventModule,
    SharedModule,
    MatDialogModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    HttpClientModule,
    MatAutocompleteModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [CalendarComponent, AddEventComponent],
  entryComponents: [AddEventComponent]
})
export class CalendarsModule { }
