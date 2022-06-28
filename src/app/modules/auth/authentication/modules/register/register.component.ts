import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../../../shared/services/api.service';
import {HttpClient} from "@angular/common/http";
import {UtilityService} from "../../../../shared/services/utility.service";

// const NAME_REGEX =/[a-zA-Z]{3,}$/;
const NAME_REGEX = /^[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+$/;
const EMAIL_REGEX = /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,3}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&'])[^ ]{8,}$/;
// const mail_REGEX = /(., '^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+[.][A-Za-z]{2,}$')/;               //added by me

function passwordMatcher(c: AbstractControl): any | null {
  if (c?.get('confirm_password')?.value !== '') {
    return c?.get('password')?.value === c?.get('confirm_password')?.value ? null : {noMatch: 'password not matching'};
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ApiService],

})
export class RegisterComponent implements OnInit, OnChanges {
  form: any;
  formSubmission: any = true;
  passView = true;
  cPassView = true;
  termCondition: any;
  @Input() term: any;
  @Input() licenseToken: any;
  @Output() tabChange = new EventEmitter();

  constructor(private fb: FormBuilder, private as: ApiService, private http: HttpClient, private utility: UtilityService) {
    this.form = this.fb.group({
      // name: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern(NAME_REGEX),Validators.min(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
      confirm_password: ['', Validators.required]
    }, {validator: passwordMatcher});
  }

  ngOnInit(): void {

  }
  ngOnChanges(sc: SimpleChanges): void {
    // console.log(sc);
    if (sc?.term){
      this.termCondition = sc?.term.currentValue;
    }
  }
  signUp(data: any): any {
    if (this.formSubmission) {
      this.form.value.ID = Math.floor(Math.random() * 1000000).toString();
      if (this.licenseToken?.type === 'license' ) {
        this.form.value.licenseToken = this.licenseToken.value;
        this.form.value.context = 'monet';
      }
      // console.log(this.form);
      this.http.post(`https://www.monetlive.com/many/api/${this.licenseToken?.type === 'license' ? 'register-invited-user' :  'register-user'}`, this.form.value).subscribe((next: any) => {
        if (next.error === false) {
          // console.log('SignUp Successful :', next.message);
          this.utility.notify(next.message, 'success');
          this.tabChange.emit(false);
        } else {
         // console.error('SignUp Attempt Failed :', next);
          this.utility.notify(next.message, 'error');
        }
      });
    } else {
      this.tabChange.emit(this.formSubmission);
    }
  }

  setFormSubmissionFlag(action: any): any {
    // if (action) {
    this.formSubmission = action;
    // }
  }
}
