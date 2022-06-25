import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WaitingListComponent} from './waiting-list.component';
import {SharedModule} from '../../../shared/shared.module';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [WaitingListComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatListModule,
        MatTooltipModule,
    ],
  exports: [WaitingListComponent]
})
export class WaitingListModule { }
