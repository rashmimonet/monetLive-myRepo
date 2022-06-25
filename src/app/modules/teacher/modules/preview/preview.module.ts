import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview.component';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatBadgeModule} from "@angular/material/badge";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { MatDialogModule } from '@angular/material/dialog';
import { ConfigureMediaComponent } from './configure-media/configure-media.component';
import { ConfigureMediaModule } from './configure-media/configure-media.module';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [PreviewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        MatIconModule,
        MatCheckboxModule,
        MatButtonModule,
        MatMenuModule,
        MatTooltipModule,
        MatBadgeModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        ConfigureMediaModule,
        FormsModule
    ],
  exports: [PreviewComponent],
  entryComponents: [ConfigureMediaComponent]
})
export class PreviewModule { }
