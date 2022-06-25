import { NgModule } from '@angular/core';
import {BottomSheetComponent, ManagerVideoPanelComponent} from './manager-video-panel.component';
import {SharedModule} from '../../../shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {LineGraphModule} from '../../../reports/modules/line-graph/line-graph.module';
import {VideoStreamModule} from '../../../../components/video-stream/video-stream.module';

@NgModule({
  declarations: [
    BottomSheetComponent,
    ManagerVideoPanelComponent],
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
    LineGraphModule,
    VideoStreamModule
  ],
  exports: [ManagerVideoPanelComponent],
  entryComponents: [BottomSheetComponent]
})
export class ManagerVideoPanelModule { }
