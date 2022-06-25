import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoStreamComponent } from './video-stream.component';
import {SharedModule} from '../../modules/shared/shared.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [VideoStreamComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [VideoStreamComponent]
})
export class VideoStreamModule { }
