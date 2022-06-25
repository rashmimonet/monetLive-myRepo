import { NgModule } from '@angular/core';
import { TopBarComponent } from './top-bar.component';
import {SharedModule} from '../../../shared/shared.module';
import {MatChipsModule} from '@angular/material/chips';
import {DashboardService} from '../dashboard/dashboard.service';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [TopBarComponent],
  imports: [
    SharedModule,
    MatChipsModule,
    MatDialogModule
  ],
  exports: [TopBarComponent],
  providers: [DashboardService]
})
export class TopBarModule { }
