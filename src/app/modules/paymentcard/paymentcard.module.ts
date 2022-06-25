import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddcardComponent } from './addcard/addcard.component';
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { PaymentStatusComponent } from './payment-status/payment-status.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import {MatIconModule} from "@angular/material/icon";
import {ApiService} from "../shared/services/api.service";
import {ScriptLoadService} from "../shared/services/script-load.service";
import { PaymentUIComponent } from './payment-ui/payment-ui.component';
import {SharedModule} from "../shared/shared.module";
@NgModule({
  declarations: [AddcardComponent, PaymentStatusComponent, PaymentPageComponent, PaymentUIComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        RouterModule.forChild([
            {path: '', component: AddcardComponent},
            {path: 'paySuccess', component: AddcardComponent}

        ]),
        SharedModule,
    ],
  providers: [ ApiService, ScriptLoadService ]
})
export class PaymentcardModule {}
