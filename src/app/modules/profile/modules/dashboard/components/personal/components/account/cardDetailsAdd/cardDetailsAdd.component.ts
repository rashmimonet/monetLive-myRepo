import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import * as countryData from '../../../../../../../../../../assets/countryData.json';
import {UtilityService} from "../../../../../../../../shared/services/utility.service";

@Component({
  selector: 'app-cardDetailsAdd',
  templateUrl: './cardDetailsAdd.component.html',
  styleUrls: ['./cardDetailsAdd.component.scss'],
})
export class CardDetailsAddComponent implements OnInit {
  cardFormControl = [
    {
      name: 'number',
      placeHolder: '',
      text: 'Card Number',
      type: 'number',
      max: '16',
    },
    {
      child: [
        {
          name: 'monthYear',
          placeHolder: 'MM / YY',
          text: 'EXP Date',
          type: 'month',
          max: '',
        },
        {
          name: 'cvc',
          placeHolder: 'CVC',
          text: 'CVC',
          type: 'number',
          max: '3',
        },
      ],
    },
    {
      name: 'name',
      placeHolder: 'Enter Card Holder Name',
      text: 'Card Holder Name',
      type: 'text',
      max: '',
    },
    {
      child: [
        {
          name: 'address_country',
          placeHolder: 'Choose Country',
          text: 'Country',
          type: 'select',
        },
        {
          name: 'address_zip',
          placeHolder: 'Enter Zip',
          text: 'Zip Code',
          type: 'number',
          max: '7',
        },
      ],
    },
  ];
  user: any;
  cardData: any= [];
  userDetails: any = [];
  cardForm!: FormGroup;
  country: any;
  constructor(
    private fb: FormBuilder,
    private as: ApiService,
    private utility: UtilityService,
    public dialogRef: MatDialogRef<CardDetailsAddComponent>
  ) {}

  ngOnInit(): void {
    this.country = Object.values(countryData);
    // console.log('country', this.country);
    // this.user = this.as.getLocalStorage('userDetails');
    this.createForm();
  }
  createForm(): void {
    const obj: any = {};
    this.cardFormControl.forEach((n: any) => {
      if (!n?.child) {
        obj[n.name] = ['', Validators.required];
      } else {
        n.child.forEach((c: any) => {
          obj[c.name] = ['', Validators.required];
        });
      }
    });
    // console.log(obj);

    this.cardForm = this.fb.group(obj);
  }
  validFunc(control: any): boolean {
    if (
      control &&
      this.cardForm.controls[control]?.touched &&
      this.cardForm.controls[control]?.errors?.required
    ) {
      return true;
    } else {
      return false;
    }
  }
  addCardFunc(): void {
    // console.log(this.cardForm.value);
    const exp_year = this.cardForm.value.monthYear.split('-')[0];
    const exp_month = this.cardForm.value.monthYear.split('-')[1];
    this.cardForm.value.exp_year = exp_year;
    this.cardForm.value.exp_month = exp_month;
    delete this.cardForm.value.monthYear;

    this.as
      .postApi('addPaymentMethod', {
        userId: this.user?._id,
        card: this.cardForm.value,
      })
      .subscribe((next: any) => {
        if (next.error) {
          this.utility.notify(next.message.code, 'error');
        } else {
          this.as.storeLocalStorage('userDetails', next.user);
          this.user = next.user;
          this.dialogRef.close(next.user);
        }
      });
  }
}
