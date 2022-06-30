import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { ApiService } from '../../../../../../../shared/services/api.service';
import { BehaviourSubjectsService } from '../../../../../../../../services/behaviour-subjects.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentPageComponent } from 'src/app/modules/paymentcard/payment-page/payment-page.component';
import * as countryData from '../../../../../../../../../assets/countryData.json';
import { UtilityService } from "../../../../../../../shared/services/utility.service";
import { StyleDirective } from "./style.directive";
import { HttpClient } from '@angular/common/http';

// const NAME_REGEX = /^[a-zA-Z]{1}[a-z]+[ ]{1}[a-zA-Z]{1}[a-z]+$/;
// const NAME_REGEX = /^[a-zA-Z ]{2,}(?: [a-zA-Z] +)?(?: [a-zA-Z ]+)?$/;
const NAME_REGEX = /[a-zA-Z ]{3,}$/;
const CONTACT_REGEX = /[0-9]{7,15}$'/;
const PINCODE_REGEX = /(., '^[0-9]{6}$')/;
const Address_Regex = /[a-zA-Z0-9][0-9\.\-\\/# ,a-zA-Z]+[ ,]+[0-9\\\/#, a-zA-Z]{1,}$/;
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
  cardData: any= [];
  personalDataForms: any;
  submitted = false;
  imageUrl: any;
  isDisabled: boolean = true;
  // adminId = JSON.parse(localStorage.getItem('userDetails') || '').email;
  fileUpload: any = {};
  mouseHover = false;
  defaultIcon = false;
  userDetails: any = [];
  imgExtension = ['png', 'jpg', 'jpeg', 'gif'];
  country: any = [];
  stateChoose: any = [];
  phoneData: any= [];
  phoneHint: any;
  isPhoneHint: boolean= false;
  formField = {
    edit: false,
    fields: [
      {
        name: 'name',
        placeholder: 'enter name',
        type: 'text',
        required: true,
        regex: '[a-zA-Z ]{3,}$',
      },
      {
        name: 'email',
        placeholder: 'enter email',
        type: 'email',
        required: true,
        regex: '/\S+@\S+\.\S+/',
      },
      // {
      //   name: 'contact',
      //   placeholder: '+919876543210',
      //   type: 'number',
      //   required: true,
      //   regex: '[0-9]{7,15}$',
      // },
      {
        name: 'address',
        placeholder: 'enter address',
        type: 'text',
        required: true,
        regex: '^[a-zA-Z0-9][0-9\.\-\\/# ,a-zA-Z]+[ ,]+[0-9\\\/#, a-zA-Z]{1,}',
      },//[A-Za-z0-9'\.\-\s\,
      {
        name: 'gender',
        placeholder: '',
        type: 'radio',
        child: ['male', 'female'],
      },
      {
        name: 'age',
        placeholder: 'enter age',
        type: 'number',
        required: true,
        regex: '^[1-9][0-9]{0,1}$',
      },
      {
        name: 'pinCode',
        placeholder: 'enter pin code',
        type: 'number',
        required: true,
        regex: '[0-9]{6}$',
      },
      {
        name: 'city',
        placeholder: 'enter city name',
        type: 'text',
        required: true,
        regex: '[a-zA-Z]{2,30}$',
      },

      {
        name: 'country',
        placeholder: 'Select country',
        type: 'select',
        // regex: /[a-zA-Z]{1,30}$/,
      },
      {
        name: 'state',
        placeholder: 'Select state',
        type: 'select',
        // regex: /[a-zA-Z]{1,30}$/,
      },
    ],
  };

  phoneForm = new FormGroup({});
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
  ) { 
      // contact: ['', [Validators.required, Validators.pattern(CONTACT_REGEX)]],
      // phone: ['+919876543210',[Validators.required]],
    this.personalDataForms = this.fb.group({                  //added
      name: ['', [Validators.required, Validators.pattern(NAME_REGEX), Validators.min(3)]],
      email: [{value: '', disabled: true}],
      pincode: ['', [Validators.required, Validators.pattern(PINCODE_REGEX)]],
      address: ['', [Validators.required, Validators.pattern(Address_Regex)]],
      age: ['', [Validators.required, Validators.pattern(Age_Regex), Validators.min(1), Validators.max(2)]],
      city: ['', [Validators.required, Validators.pattern(City_Regex), Validators.min(3), Validators.max(30)]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
    this.phoneForm = this.fb.group({
      phone: ['+919876543210',[Validators.required]]
    });
  }

  yourComponentMethodToTreatyCountryChangedEvent(event: any){
    console.log('event', event);
    this.phoneHint = event.placeHolder;
    console.log('placeHolder', this.phoneHint);
  }
  validateNo(e: any): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  ngOnInit(): void {
    // console.log('Country List :', Object.values(countryData));
    this.country = Object.values(countryData);
    this.createPersonalForm();
    this.userDetails = this.api.getLocalStorage('userDetails');
    this.userDetails?.paymentHistory.reverse();
    // this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.api.getApiStatic(`cardsDetails?email=${this.userDetails.email}`).subscribe((cardData: any)=>{
      this.cardData = cardData.cards;
    });
    this.defultIconSet(this.userDetails);
    // this.bService.userDetails.next(this.userDetails);
    this.personalDataForms.disable();
    this.phoneForm.disable();
  }
  
  
dateConvert(date: any): any {
  return new Date(date);
}

createPersonalForm(): void {
  const formGroup: any = {
    ID: [''],
    image: [''],
  };
  this.formField.fields.forEach((item: any) => {
    formGroup[item.name] = [''];
  });
  this.personalDataForms = this.fb.group(formGroup);
  // this.phoneForm = this.fb.group(formGroup);
}

// chooseState(country: any): void {
//   // debugger

//   // console.log('country', country)
//   if(country) {
//     // for(let i = 0; i < country.states.length - 1; i++){

//     this.stateChoose = country.states;
//     // console.log('country', this.stateChoose);
//     // }
//   }
// }

chooseState(country: any): void {
  if (country) {
    // console.log('country', country);
    this.stateChoose = country.states;
  }
}
personalDataFormDisabled(): void {
  // debugger
  this.formField.edit = !this.formField.edit;
  if(this.formField.edit) {
  this.personalDataForms.enable();
  this.personalDataForms.controls['email'].disable();
  this.phoneForm.enable();
  this.isPhoneHint= true;
} else {
  if (this.personalDataForms.touched && this.phoneForm.touched) {
    const formData = new FormData();
    formData.append('ID', this.personalDataForms.get('ID').value);
    this.formField.fields.forEach((field: any) => {
      formData.append(
        field.name,
        this.personalDataForms.get(field.name).value
      );
    });
    if (this.fileUpload.file) {
      formData.append('avatar', this.fileUpload.file, this.fileUpload.name);
    }
  
    this.updateApi(formData);
  }
  this.personalDataForms.disable();
  this.phoneForm.disable();
  this.isPhoneHint= false;
}
  }

updateApi = (data: any) => {
  this.api.putApi('updateUser', data).subscribe((next) => {
    if (!next.error) {
      this.userDetails = next.data;
      this.userDetails.paymentHistory.reverse();
      this.personalDataForms.touched = false;
      // this.phoneForm.touched = false;
      // this.bService.userDetails.next(next.data);
      this.defultIconSet(this.userDetails);
      this.api.storeLocalStorage('userDetails', next.data);
    }
    this.utility.notify(next.message, '');
  });
};
mouseEnter = () => {
  if (this.formField.edit && this.imageUrl) {
    this.mouseHover = true;
  }
};
mouseLeave = () => {
  this.mouseHover = false;
};

removeAvatar = () => {
  if (this.userDetails.avatar) {
    const formDatas = new FormData();
    formDatas.append('ID', this.personalDataForms.get('ID').value);
    formDatas.append('avatar', '');
    this.updateApi(formDatas);
  } else {
    this.imageUrl = '';
  }
};
cancel = () => {
  this.formField.edit = false;
  this.defultIconSet(this.userDetails);
  this.personalDataForms.disable();
  this.phoneForm.disable();
};

formData(): any {
  this.formField.edit = false;
  // console.warn('UpdateForm', this.personalDataForms.value);
}

imageUpload(e: any): any {
  const reader = new FileReader();
  const file = e.target.files[0];
  const files = file.name.split('.');
  // console.log(this.imgExtension.includes(files[1]));
  if (this.imgExtension.includes(files[1])) {
    this.fileUpload.file = e.target.files[0];
    this.fileUpload.name = this.userDetails.ID + '.' + files[1];
    this.personalDataForms.touched = true;
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (ev: any) => {
        this.defaultIcon = true;
        this.imageUrl = ev.target.result;
      };
    }
  } else {
    this.utility.notify('Image Not Supported', 'error');
  }
}

defultIconSet = (datas: any) => {
  const data = datas;
  if (data) {
    if (data.avatar) {
      this.defaultIcon = true;
      this.imageUrl = data.avatar;
    } else {
      this.defaultIcon = false;
      this.imageUrl = '';
    }
    this.personalDataForms.patchValue(data);
    this.stateChoose.push({ state_name: this.userDetails?.state });
  }
};

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
       this.api.getApiStatic(`cardsDetails?email=${result.email}`).subscribe((cardData: any)=>{
            this.cardData = cardData.cards;
          });
      // this.styleDirective.setStyle(this.userDetails.cards.length);
      // console.log('number of cards (from Component) : ', this.userDetails.cards.length);
    }
  });
}

onDeleteImage(index: any) {
  this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
  // const emails = this.userDetails;
  // emails.cards.splice(index, 1);
  // localStorage.setItem('userDetails', JSON.stringify(emails));
  const email = this.userDetails.email;
  // this.api.deleteApi(`deletecard?id=${index._id}&email=${email}`).subscribe((deleteID: any)=>{
    this.http.delete(`https://www.monetlive.com/many/api/deletecard?id=${index._id}&email=${email}`).subscribe((deleteID: any)=>{
    this.api.getApiStatic(`cardsDetails?email=${email}`).subscribe((cardData: any)=>{
      this.cardData = cardData.cards;
    })
  });
}     
  /*getStyle(cardNumber: number): any {
    let styleObject = {};
      if (cardNumber === 0) {
        styleObject = {
          'width': '100%',
          'margin': 'auto',
          'padding': '0 40%',     
          'justify-content': 'center'
        }
      }
      else if (cardNumber === 1) {
        styleObject = {
          'width': '100%',
          'padding': '0 10%',
          'justify-content': 'center',
        }
      }
      else if (cardNumber === 2) {
        styleObject = {
          'width': '100%',
          'padding': '0 10%',
          'justify-content': 'center',
        }
      }
      else  {
        styleObject = {
          'width': '100%',
          'padding': '0 1%',
          'justify-content': 'center',
        }
      }
    return styleObject;
  }*/
}
