import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerVideoComponent } from './manager-video.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {ReactiveFormsModule} from '@angular/forms';
import {StudentListModule} from '../../../../components/student-list/student-list.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {CallSidnavModule} from '../../../teacher/modules/call-sidnav/call-sidnav.module';
import {ChatModule} from '../../../teacher/modules/chat/chat.module';
import {ManagerVideoPanelModule} from '../manager-video-panel/manager-video-panel.module';
import {TopBarModule} from '../../../../components/top-bar/top-bar.module';
const routes: Routes = [{ path: '', component: ManagerVideoComponent }];
@NgModule({
  declarations: [ManagerVideoComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    StudentListModule,
    MatTooltipModule,
    MatIconModule,
    CallSidnavModule,
    ManagerVideoPanelModule,
    ChatModule,
    TopBarModule
  ]
})
export class ManagerVideoModule { }
