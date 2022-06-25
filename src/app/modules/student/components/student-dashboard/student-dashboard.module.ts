import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDashboardComponent } from './student-dashboard.component';
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
import {MatBadgeModule} from '@angular/material/badge';
import {CallSidnavModule} from '../../../teacher/modules/call-sidnav/call-sidnav.module';
import {StudentVideoModule} from '../../../teacher/modules/student-video/student-video.module';
import {VideoPanelModule} from '../video-panel/video-panel.module';
import {ChatModule} from '../../../teacher/modules/chat/chat.module';
import {TopBarModule} from '../../../../components/top-bar/top-bar.module';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from '@angular/material/menu';

const routes: Routes = [{ path: '', component: StudentDashboardComponent }];


@NgModule({
  declarations: [StudentDashboardComponent],
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
        MatBadgeModule,
        CallSidnavModule,
        StudentVideoModule,
        VideoPanelModule,
        ChatModule,
        TopBarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatMenuModule,
    ]
})
export class StudentDashboardModule { }
