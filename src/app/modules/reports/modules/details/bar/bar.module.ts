import { NgModule } from '@angular/core';
import { BarComponent } from './bar.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [BarComponent],
  imports: [
    SharedModule
  ],
  exports: [BarComponent]
})
export class BarModule { }
