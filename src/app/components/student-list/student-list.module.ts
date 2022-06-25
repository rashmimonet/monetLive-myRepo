import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {SharedModule} from '../../modules/shared/shared.module';
import {MatTooltipModule} from '@angular/material/tooltip';



@NgModule({
  declarations: [StudentListComponent],
  imports: [
    SharedModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [StudentListComponent]
})
export class StudentListModule { }
