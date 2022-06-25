import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import {SharedModule} from '../../modules/shared/shared.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatMenuModule} from "@angular/material/menu";
import {WaitingListComponent} from '../../modules/teacher/modules/waiting-list/waiting-list.component';
import {WaitingListModule} from '../../modules/teacher/modules/waiting-list/waiting-list.module';
import {MatBadgeModule} from '@angular/material/badge';



@NgModule({
  declarations: [TopBarComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatGridListModule,
    MatMenuModule,
    WaitingListModule,
    MatBadgeModule
  ],
  exports: [TopBarComponent],
  entryComponents: [WaitingListComponent]
})
export class TopBarModule { }
