import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { I } from '@angular/cdk/keycodes';


const NAME_REGEX = /^[a-zA-Z][a-zA-Z ]{3,}$/;
// const EMAIL_REGEX = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,3}$/;
// const PINCODE_REGEX = /(., '^[0-9]{6}$')/;
const PINCODE_REGEX = /^[1-9][0-9]{4,9}$/
const Address_Regex = /[a-zA-Z0-9][0-9\.\-\\/# ,a-zA-Z-]+[ ,]+[0-9\.\\/#, a-zA-Z-]{2,}$/;
const City_Regex = /[a-zA-Z ]{3,30}$/;
// const Age_Regex = /^[1-9][0-9]{1}$/;
const Age_Regex = /^(?:1[3-9]|[2-9][0-9]|99)$$/;
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  form: any;
  formSubmission: any = true;
  passView = true;
  termCondition: any;
  phoneHint: any;
  country: any = [];
  stateChoose: any = [];
  userDetails: any = [];
  id: any;
  imageUrl: any;
  mouseHover = false;
  defaultIcon = false;
  imgExtension = ['png', 'jpg', 'jpeg', 'gif'];
  fileUpload: any = {};
  email: any;
  countryCode: any;
  isEnabled: boolean = false;
  isPhoneHint: boolean = false;
  stateId: any;
  constructor(private fb: FormBuilder,
    private api: ApiService,
    private utility: UtilityService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.userDetails = this.api.getLocalStorage('userDetails');
    this.userDetails?.paymentHistory.reverse();
    this.id = this.userDetails.ID;
    this.email = this.userDetails.email;
    this.http.get('https://www.eemo.live/Monet-quick/api/getCountries').subscribe((data: any) => {
      this.country = data.response;
    })
    this.form = this.fb.group({
      ID: [this.id],
      image: [''],
      name: ['', [Validators.required, Validators.pattern(NAME_REGEX), Validators.min(3)]],
      email: [this.email],
      address: ['', [Validators.required, Validators.pattern(Address_Regex)]],
      age: ['', [Validators.required, Validators.pattern(Age_Regex)]],
      gender: ['', Validators.required],
      contact: ['+919876556545', [Validators.required]],
      city: ['', [Validators.required, Validators.pattern(City_Regex)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', [Validators.required, Validators.pattern(PINCODE_REGEX)]]
    });
    // console.log('submit', this.form);
    this.defultIconSet(this.userDetails);
    this.form.disable();
    this.isEnabled = true;
  }

  preventDefault(){
    let inbox = document.getElementById('defaultClasses');
    let pin = document.getElementById('defaultClass');
    // let contact = document.getElementById('contactdefault');
    let defaultSign = [
      "-",
      "+",
      "e",
      "E"
    ];
    inbox.addEventListener("keydown", function(e: any) {
      if (defaultSign.includes(e.key)) {
        e.preventDefault();
      }
    });
    pin.addEventListener("keydown", function(e: any) {
      if (defaultSign.includes(e.key)) {
        e.preventDefault();
      }
    });
    // contact.addEventListener("keydown", function(e: any) {
    //   if (defaultSign.includes(e.key)) {
    //     e.preventDefault();
    //   }
    // });
  }
  yourComponentMethodToTreatyCountryChangedEvent(event: any) {
    this.phoneHint = event.placeHolder;
  }

  chooseState(data: any): void {
    if (data) {
      this.countryCode = data.country_id;
      // console.log('states id', this.stateChoose);
      this.http.get(`https://www.eemo.live/Monet-quick/api/getStates?country_id=${this.countryCode}`).subscribe((data: any) => {
        this.stateChoose = data.response;
        console.log('state', this.stateChoose);
       

      })
    }
  }
  // chooseCity(stateId: any){
  //   debugger      
  //   if (stateId) {
  //     this.http.get(`https://www.eemo.live/Monet-quick/api/cities/state_id=1657`).subscribe((city: any) => {
  //       console.log('city', city);
  //     });
  //   }
  // }
  signUp(data: any): any {
    console.warn(this.form.value);
  }
  setFormSubmissionFlag(): any {
    if (this.form.status === 'DISABLED') {
      this.form.enable();
      this.form.controls['email'].disable();
      this.isPhoneHint = true;
      this.isEnabled = false;
    } else {
      this.updateApi(this.form.value);
      this.isEnabled = true;
      this.form.disable();
      this.isPhoneHint = false;
    }
  }
  updateApi = (data: any) => {
    this.api.putApi('updateUser', data).subscribe((next) => {
      // console.log('update', next);

      if (!next.error) {
        this.userDetails = next.data;
        this.userDetails.paymentHistory.reverse();
        this.form.touched = false;
        this.defultIconSet(this.userDetails);
        this.api.storeLocalStorage('userDetails', next.data);
        // console.log('ud', next.data);

      }
      this.utility.notify(next.message, '');
    });
  }
  mouseEnter = () => {
    if (this.form.invalid && this.imageUrl) {
      this.mouseHover = true;
    }
  };
  mouseLeave = () => {
    this.mouseHover = false;
  };

  removeAvatar = () => {
    if (this.userDetails.avatar) {
      const formDatas = new FormData();
      formDatas.append('ID', this.form.get('ID').value);
      formDatas.append('avatar', '');
      this.updateApi(formDatas);
    } else {
      this.imageUrl = '';
    }
  };
  cancel = () => {
    this.form.valid = false;
    this.defultIconSet(this.userDetails);
    this.form.disable();
  };
  imageUpload(e: any): any {
    const reader = new FileReader();
    const file = e.target.files[0];
    const files = file.name.split('.');
    if (this.imgExtension.includes(files[1])) {
      this.fileUpload.file = e.target.files[0];
      this.fileUpload.name = this.userDetails.ID + '.' + files[1];
      this.form.touched = true;
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
      this.form.patchValue(data);
      this.stateChoose.push({ state_name: this.userDetails?.state });
    }
  };
}
