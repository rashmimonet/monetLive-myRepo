import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BottomSheetComponent, VideoPanelComponent} from './video-panel.component';
import {SharedModule} from '../../../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import {VideoStreamModule} from '../../../../components/video-stream/video-stream.module';
import {MatMenuModule} from '@angular/material/menu';
import {TopBarModule} from "../../../../components/top-bar/top-bar.module";
import {ConfigureMediaComponent} from '../../../teacher/modules/preview/configure-media/configure-media.component';
import {ConfigureMediaModule} from '../../../teacher/modules/preview/configure-media/configure-media.module';
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    BottomSheetComponent,
    VideoPanelComponent],
  imports: [
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    HttpClientModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatDialogModule,
    MatMenuModule,
    VideoStreamModule,
    TopBarModule,
    ConfigureMediaModule,
    FormsModule,
    MatCheckboxModule
  ],
  exports: [VideoPanelComponent],
  entryComponents: [BottomSheetComponent, ConfigureMediaComponent]
})
export class VideoPanelModule { }
