import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { ScriptLoadService } from '../../shared/services/script-load.service';
// const downloadjs = require('downloadjs');

declare function checkStatus(cb: any): any;

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss'],
})
export class PaymentStatusComponent implements OnInit {
  selectPlan: any;
  user: any;
  receiptUrl: any;
  paymentError = false;
  constructor(private as: ApiService, private sl: ScriptLoadService) {}

  ngOnInit(): void {
    this.selectPlan = this.as.getLocalStorage('planUpgrade');
    this.user = this.as.getLocalStorage('userDetails');
    console.log(this.user);
    this.as
      .getApi(`userStatus?userId=${this.user._id}`)
      .subscribe((result: any) => {
        if (!result.error) {
          this.paymentError = false;
          console.log('Payment Receipt API res: ', result);
          this.as.getApi(`getPlan?planId=${result.user?.plan.id}`).subscribe((res: any) => {
            localStorage.setItem('userPlanDetails', JSON.stringify(res?.plan));
          });
          this.receiptUrl = result.receipt;
          this.as.storeLocalStorage('userDetails', result.user);
        } else {
          this.paymentError = true;
        }
      });
  }

  viewReceipt(): any {
    console.log('Recipt URL : ', this.receiptUrl);
    window.open(this.receiptUrl);
  }
}
