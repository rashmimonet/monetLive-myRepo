import { NgModule } from '@angular/core';
import {CallComponent, InviteStudentComponent} from './call.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {StudentListModule} from '../../../../components/student-list/student-list.module';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatDialogModule} from '@angular/material/dialog';
import {CallSidnavModule} from '../call-sidnav/call-sidnav.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatBadgeModule} from '@angular/material/badge';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {StudentVideoModule} from '../student-video/student-video.module';
import {ChatModule} from '../chat/chat.module';
import {TopBarModule} from '../../../../components/top-bar/top-bar.module';
import {PreviewModule} from '../preview/preview.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from '@angular/material/menu';

const routes: Routes = [{ path: '', component: CallComponent}];

@NgModule({
  declarations: [CallComponent, InviteStudentComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        ReactiveFormsModule,
        CallSidnavModule,
        StudentListModule,
        StudentVideoModule,
        MatTooltipModule,
        MatIconModule,
        MatButtonToggleModule,
        ClipboardModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatBadgeModule,
        MatSidenavModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        ChatModule,
        TopBarModule,
        PreviewModule,
        MatProgressSpinnerModule,
        MatMenuModule,
    ],
  exports: [InviteStudentComponent],
  entryComponents: [InviteStudentComponent]
})
export class CallModule { }
