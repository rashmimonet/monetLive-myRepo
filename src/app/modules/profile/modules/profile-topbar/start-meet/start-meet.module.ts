import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StartMeetComponent} from './start-meet.component';
import {SharedModule} from '../../../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [StartMeetComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule
  ],
  exports: [StartMeetComponent]
})
export class StartMeetModule { }
