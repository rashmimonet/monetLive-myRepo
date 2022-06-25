import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssignmentComponent} from './assignment.component';
import {SharedModule} from '../../../shared/shared.module';
import { GridInfoComponent } from './grid-info/grid-info.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatRippleModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import { FileUploadComponent } from './file-upload/file-upload.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { SingleMultipleComponent } from './single-multiple/single-multiple.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import { NumericalComponent } from './numerical/numerical.component';
import { FreeTextComponent } from './free-text/free-text.component';
import { GridComponent } from './grid/grid.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ImageComponent } from './image/image.component';
import { WriteQuestionComponent } from './write-question/write-question.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';


const routes: Routes = [{ path: '', component: AssignmentComponent}];

@NgModule({
  declarations: [AssignmentComponent, GridInfoComponent, FileUploadComponent, SingleMultipleComponent, NumericalComponent, FreeTextComponent, GridComponent, ImageComponent, WriteQuestionComponent, AlertDialogComponent],
  imports: [
        SharedModule,
        RouterModule.forChild(routes),
        MatCardModule,
        MatDividerModule,
        MatRippleModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatSlideToggleModule,
        MatDialogModule
    ]
})
export class AssignmentModule { }
