import { Component, NgZone, OnInit} from '@angular/core';
import { ScriptLoadService } from '../../shared/services/script-load.service';
import { ApiService } from '../../shared/services/api.service';
import {BehaviourSubjectsService} from '../../../services/behaviour-subjects.service';
// import Func = jasmine.Func;

declare function initialize(userId: any, planId: any, link: string | null): any;

@Component({
  selector: 'app-payment-ui',
  templateUrl: './payment-ui.component.html',
  styleUrls: ['./payment-ui.component.scss'],
  providers: [BehaviourSubjectsService]
})
export class PaymentUIComponent implements OnInit {
  dynamicLink = sessionStorage.getItem('dynamoLink' || '');
  loader = false;
  paymentHandler: any;
  constructor(private sl: ScriptLoadService, private as: ApiService, private zone: NgZone, private bhvSub: BehaviourSubjectsService) {}

  ngOnInit(): void {

    this.sl.load('checkout').then((res: any) => {
        console.log('Checkout.js loaded');
        this.invokeStripe();
    });
    // tslint:disable-next-line:variable-name
    /*const observer = new MutationObserver((mutations_list: any) => {
      mutations_list.forEach((mutation: any) => {
        // tslint:disable-next-line:variable-name
        mutation.addedNodes.forEach((added_node: any) => {
          for (const key in added_node) {
            if (key === 'className') {
              this.zone.run(() => {
                setTimeout(() => {
                  this.loader = false;
                }, 2000);
                observer.disconnect();
              });
            }
          }
        });
      });
    });*/
    // tslint:disable-next-line:no-non-null-assertion
    // observer.observe(document.querySelector('#payment-element')!, { subtree: false, childList: true });
  }

  invokeStripe(): void {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (window as any).StripeCheckout.configure({
          key: 'pk_test_51KBv6oAS6fMexrhZAkuHyWW2zPVsVTDghIWRZHcOvqLCgFJjno84xq2zrOqrnIt6tyQvF5r9d0Nid0HtBNhAjeIw00kpH2gTBv',
          locale: 'auto',
          token(stripeToken: any): any {
            console.log('Stripe Token :', stripeToken);
          },
        });
      };
      const plan = this.as.getLocalStorage('planUpgrade')._id;
      const user = this.as.getLocalStorage('userDetails')._id;
      initialize(user, plan, this.dynamicLink);
    }
  }
}
