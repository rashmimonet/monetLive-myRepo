import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentLoginComponent } from './student-login.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {ReactiveFormsModule} from '@angular/forms';
import {TestMediaComponent} from "./test-media/test-media.component";
import {TestMediaModule} from "./test-media/test-media.module";
import {MatDialogModule} from "@angular/material/dialog";
const routes: Routes = [{ path: '', component: StudentLoginComponent }];

@NgModule({
  declarations: [StudentLoginComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    TestMediaModule,
    MatDialogModule,
  ],
  exports: [StudentLoginComponent],
  entryComponents: [TestMediaComponent]
})
export class StudentLoginModule { }
