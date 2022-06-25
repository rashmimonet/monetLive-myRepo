import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingListComponent } from './meeting-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MeetingListRoutingModule } from './meeting-list-routing.module';



@NgModule({
  declarations: [MeetingListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MeetingListRoutingModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [MeetingListComponent],
})
export class MeetingListModule { }
