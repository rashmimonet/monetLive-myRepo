import { NgModule } from '@angular/core';
import { DetailsComponent } from './details.component';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {BarModule} from "./bar/bar.module";

const routes: Routes = [{ path: '', component: DetailsComponent}];

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    SharedModule,
    BarModule,
    RouterModule.forChild(routes),
  ]
})
export class DetailsModule { }
