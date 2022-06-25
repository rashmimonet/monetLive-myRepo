import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestMediaComponent} from "./test-media.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {SharedModule} from "../../../../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [TestMediaComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatButtonModule
  ],
  exports: [TestMediaComponent]
})
export class TestMediaModule { }
