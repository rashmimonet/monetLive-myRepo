import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {StartMeetModule} from './modules/profile-topbar/start-meet/start-meet.module';
import { MatExpansionFilterPipe } from './pipes/mat-expansion-filter.pipe';


@NgModule({
    declarations: [ProfileComponent, MatExpansionFilterPipe],
    exports: [
        MatExpansionFilterPipe
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        StartMeetModule
    ]
})
export class ProfileModule { }
