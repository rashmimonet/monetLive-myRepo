import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../../shared/services/api.service';
// import * as countryData from '../../../../assets/countryData.json';
import {UtilityService} from "../../shared/services/utility.service";
import { HttpClient } from '@angular/common/http';
// import { debug } from 'console';

// const NAME_REGEX = /[a-zA-Z]{3,}$/;
const NAME_REGEX = /[a-zA-Z_ ]*$/
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss'],
})
export class PaymentPageComponent implements OnInit {
  addCardForm!: FormGroup;
  cardIcon = [
    {name: 'Visa'},
    {name: 'MasterCard'},
    {name: 'American Express'},
    {name: 'Discover'},
    {name: 'Diners Club'},
  ];
  country: any;
  user: any;
  invalidExpiry: boolean = false;
 
  cardData: any = [];

  constructor(
    private fb: FormBuilder,
    private as: ApiService,
    private utility: UtilityService,
    public dialogRef: MatDialogRef<PaymentPageComponent>,
    public http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.http.get('https://www.monetlive.com/many/api/country').subscribe((data: any) => {
      this.country = data.data;
    })
    this.createCardForm();
    this.user = this.as.getLocalStorage('userDetails');
    this.autoFocus();
  }


  createCardForm(): void {
    this.addCardForm = this.fb.group({
      number: ['', [Validators.required]],
      exp_month: ['', [Validators.required]],
      exp_year: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(NAME_REGEX), Validators.min(2)]],
      cvc: ['', [Validators.required]],
      address_country: ['', [Validators.required]],
      address_zip: ['', [Validators.required]],
    });
  }

  validationFunc(type: string): boolean {
    // console.log('validationFunc', type);
    
    if (
      this.addCardForm.controls[type]?.touched &&
      this.addCardForm.controls[type]?.errors?.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  filterExpiryDate(event: any) {
    // debugger
    let val = event.target.value;
    // console.log("VAL", val);

    let regex = val.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/);


    var exp = new Date(
      this.checkFullYearFormat(1 * regex[2]),
      1 * regex[1] - 1,
      1
    ).valueOf();
    var now = new Date();
    var currMonth = new Date(now.getFullYear(), now.getMonth(), 1).valueOf();
    if (exp <= currMonth) {
      this.invalidExpiry = true;
      // alert("Invalid Expiry Date. Date should be greater than current date");
    } else {
      // alert("Valid Expiry Date");
      this.invalidExpiry = false;
      console.log('Valid Expiry Date');
      
    }
  }

  checkFullYearFormat(yearVal: any) {
    var FIXED_YEAR = 20;
    if (yearVal < 100) {
      var nowYear = new Date().getFullYear();
      yearVal += Math.floor(nowYear / 100) * 100;
      if (yearVal > nowYear + FIXED_YEAR) {
        yearVal -= 100;
      } else if (yearVal <= nowYear - 100 + FIXED_YEAR) {
        yearVal += 100;
      }
    }
    return yearVal;
  }
  validateNo(e: any): boolean {
    // console.log('validateNo', e);
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  spaceAddFourChar(e: any): any {
    e.target.value = e.target.value
      .replace(/[^\dA-Z]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  minlengthFunc(type: string): boolean {
    // console.log('minlength', type);
    
    if (
      !this.addCardForm.controls[type]?.errors?.required &&
      this.addCardForm.controls[type]?.errors?.minlength
    ) {
      return true;
    } else {
      return false;
    }
  }

  addCardFunc(): void {
    // debugger
    this.addCardForm.value.number = this.addCardForm.get('number')?.value.replaceAll(' ', '');
    this.as
      .postApi('addPaymentMethod', {
        userId: this.user?._id,
        card: this.addCardForm.value,
      })
      .subscribe((next: any) => {
        if (!next.error) {
          this.user = next.user;
          this.dialogRef.close(next.user);
          // this.utility.notify(next.message.code, 'error');
        } else {
          // this.as.storeLocalStorage('userDetails', next.user);
          // this.user = next.user;
          // this.dialogRef.close(next.user);
          this.utility.notify(next.message.code, 'error');
        }
      });
  }


  monthCheck(e: any): void {
    // console.log('monthcheck', e);
    if (+e.target.value > 12) {
      e.target.value = '';
    }
  }
  autoFocus(): any { 
    const container: any = document.getElementById('autoFocus');
    container.onkeyup = function (e: any) {
      const target = e.srcElement || e.target;
      const maxLength = parseInt(target?.attributes.maxlength.value, 10);
      const myLength = target.value.length;
      if (myLength >= maxLength) {
        let next = target;
        while ((next = next.nextElementSibling)) {
          if (next == null) {
            break;
          }
          if (next.tagName.toLowerCase() === 'input') {
            next.focus();
            break;
          }
        }
      }
      // Move to previous field if empty (user pressed backspace)
      else if (myLength === 0) {
        let previous = target;
        while ((previous = previous.previousElementSibling)) {
          if (previous == null) {
            break;
          }
          if (previous.tagName.toLowerCase() === 'input') {
            previous.focus();
            break;
          }
        }
      }
    };
  }
}
