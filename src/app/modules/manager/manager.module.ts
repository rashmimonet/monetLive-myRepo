import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ManagerComponent } from './manager.component';
import {ManagerRoutingModule} from './manager-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MeetingListComponent} from './components/meeting-list/meeting-list.component';
import {ManagerVideoComponent} from './components/manager-video/manager-video.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DurationPipe} from "../../pipes/duration.pipe";


@NgModule({
  declarations: [ManagerComponent],
    imports: [
        CommonModule,
        ManagerRoutingModule,
        MatTabsModule,
        MatButtonModule,
        MatTableModule,
        ReactiveFormsModule,
        FormsModule,
       /* MeetingListModule,
        ManagerVideoModule,
        ManagerVideoModule*/
    ],
  providers: [DurationPipe]
})
export class ManagerModule { }
