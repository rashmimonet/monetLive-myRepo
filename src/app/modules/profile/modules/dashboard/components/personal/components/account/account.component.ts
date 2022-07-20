import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ApiService } from '../../../../../../../shared/services/api.service';
import { BehaviourSubjectsService } from '../../../../../../../../services/behaviour-subjects.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentPageComponent } from 'src/app/modules/paymentcard/payment-page/payment-page.component';
import * as countryData from '../../../../../../../../../assets/countryData.json';
import { UtilityService } from "../../../../../../../shared/services/utility.service";
import { StyleDirective } from "./style.directive";
import { HttpClient } from '@angular/common/http';

const NAME_REGEX = /[a-zA-Z ]{3,}$/;
const CONTACT_REGEX = /[0-9]{7,15}$'/;
const PINCODE_REGEX = /(., '^[0-9]{6}$')/;
const Address_Regex = /[a-zA-Z0-9][0-9\.\-\\/# ,a-zA-Z-]+[ ,]+[0-9\.\\/#, a-zA-Z-]{1,}$/;
const City_Regex = /[a-zA-Z]{3,30}$/;
const Age_Regex = /^[1-9][0-9]/;

// 
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [StyleDirective],
})
export class AccountComponent implements OnInit {
  cardLength: boolean = false;
  contentEditable = false;
  cardData: any = [];
  // personalDataForms: any;
  submitted = false;
  // imageUrl: any;
  isDisabled: boolean = true;
 
  userDetails: any = [];
 
  @Output() tabSelected = new EventEmitter();
  form: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private bService: BehaviourSubjectsService,
    public dialog: MatDialog,
    private utility: UtilityService,
    private styleDirective: StyleDirective,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  validateNo(e: any): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  ngOnInit(): void {
    this.userDetails = this.api.getLocalStorage('userDetails');
    this.userDetails?.paymentHistory.reverse();
    this.api.getApiStatic(`cardsDetails?email=${this.userDetails.email}`).subscribe((cardData: any) => {
      this.cardData = cardData.cards;
    });
  }


  dateConvert(date: any): any {
    return new Date(date);
  }

  cardFormOpen(): void {
    const dialogRef = this.dialog.open(PaymentPageComponent, {
      width: '40%',
      maxWidth: '550px',
      hasBackdrop: true,
      panelClass: ['icon-outside']
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed', result);
      if (result) {
        this.userDetails = result;
        this.userDetails.paymentHistory.reverse();
        this.api.getApiStatic(`cardsDetails?email=${result.email}`).subscribe((cardData: any) => {
          this.cardData = cardData.cards;
        });
      }
    });
  }

  onDeleteImage(index: any) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const email = this.userDetails.email;
    this.http.delete(`https://www.monetlive.com/many/api/deletecard?id=${index._id}&email=${email}`).subscribe((deleteID: any) => {
      this.api.getApiStatic(`cardsDetails?email=${email}`).subscribe((cardData: any) => {
        this.cardData = cardData.cards;
      })
    });
  }
}
