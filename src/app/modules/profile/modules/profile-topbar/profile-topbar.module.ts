import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StartMeetModule} from './start-meet/start-meet.module';
import {SharedModule} from '../../../shared/shared.module';
import {StartMeetComponent} from './start-meet/start-meet.component';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { ThirdPartyService } from 'src/app/modules/shared/services/third-party.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StartMeetModule,
    MatTooltipModule
  ],

})
export class ProfileTopbarModule { }
