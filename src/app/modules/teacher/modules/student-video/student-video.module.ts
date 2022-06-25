import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountdownSnackbarComponent, StudentVideoComponent} from './student-video.component';
import {SharedModule} from '../../../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import {VideoStreamModule} from '../../../../components/video-stream/video-stream.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatMenuModule} from '@angular/material/menu';
import {TopBarModule} from "../../../../components/top-bar/top-bar.module";
import {ConfigureMediaComponent} from '../preview/configure-media/configure-media.component';
import {ConfigureMediaModule} from '../preview/configure-media/configure-media.module';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [StudentVideoComponent, CountdownSnackbarComponent],
  imports: [
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    HttpClientModule,
    MatSnackBarModule,
    MatGridListModule,
    MatMenuModule,
    VideoStreamModule,
    ClipboardModule,
    TopBarModule,
    ConfigureMediaModule,
    MatCheckboxModule,
    FormsModule
  ],
  exports: [StudentVideoComponent],
  entryComponents: [ConfigureMediaComponent]
})
export class StudentVideoModule { }
