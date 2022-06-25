import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallSidenavComponent } from './call-sidenav.component';
import {SharedModule} from '../../../shared/shared.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {CategoryFilterPipe} from '../../../shared/pipes/category-filter.pipe';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [CallSidenavComponent],
  imports: [
    SharedModule,
    MatExpansionModule,
    MatListModule,
    MatBadgeModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [CallSidenavComponent],
  providers: [CategoryFilterPipe]
})
export class CallSidnavModule { }
