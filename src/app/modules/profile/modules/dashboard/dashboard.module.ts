import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {DashboardComponent} from "./dashboard.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ProfileTopbarComponent} from "../profile-topbar/profile-topbar.component";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {PersonalModule} from "./components/personal/personal.module";
import {MatBadgeModule} from "@angular/material/badge";
import {MatDialogModule} from "@angular/material/dialog";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDividerModule} from "@angular/material/divider";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {AddEventComponent} from "../../../teacher/modules/schedule/calendar/add-event/add-event.component";
import {AddEventModule} from "../../../teacher/modules/schedule/calendar/add-event/add-event.module";
import {MatMenuModule} from '@angular/material/menu';
import {ProfileModule} from "../../profile.module";

@NgModule({
  declarations: [DashboardComponent, SidenavComponent, ProfileTopbarComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        PersonalModule,
        MatDialogModule,
        MatIconModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDividerModule,
        MatDatepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        MatFormFieldModule,
        MatCardModule,
        MatChipsModule,
        AddEventModule,
        MatBadgeModule,
        MatMenuModule,
        ProfileModule
    ],
    providers: [DatePipe],
    entryComponents: [AddEventComponent]
})
export class DashboardModule { }
