import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ShortNamePipe} from '../../pipes/short-name.pipe';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { TimePipe } from './pipes/time.pipe';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SocketService} from './services/socket.service';
import {DurationPipe} from '../../pipes/duration.pipe';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import {ApiService} from './services/api.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { SelectionStatusPipe } from './pipes/selection-status.pipe';

const matArray = [
  MatRadioModule,
  MatInputModule,
  MatTableModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  FormsModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatMenuModule,
  CommonModule,
  FlexLayoutModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule
];

@NgModule({
  declarations: [ShortNamePipe, CategoryFilterPipe, TimePipe, DurationPipe, SelectionStatusPipe],
  imports: [
    HttpClientModule,
    matArray,
  ],
    exports: [
        ShortNamePipe,
        CategoryFilterPipe,
        DurationPipe,
        TimePipe,
        matArray,
        SelectionStatusPipe,
    ],
  providers: [ SocketService, DatePipe, ApiService ]
})
export class SharedModule { }
