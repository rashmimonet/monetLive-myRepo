import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddEventComponent} from './add-event.component';
import {SharedModule} from '../../../../../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {HttpClientModule} from '@angular/common/http';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CalendarModule} from 'angular-calendar';
import {DateAdapter} from 'angular-calendar/date-adapters/esm/date-adapter';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [AddEventComponent],
    imports: [
        CommonModule,
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
        MatTooltipModule,
    ],
  exports: [AddEventComponent]
})
export class AddEventModule { }
