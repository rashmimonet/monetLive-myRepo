import {Component, Input, OnChanges, OnInit, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../../../shared/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';

import {ScriptLoadService} from '../../../../shared/services/script-load.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';
import {BehaviourSubjectsService} from '../../../../../services/behaviour-subjects.service';
import {ThirdPartyService} from '../../../../shared/services/third-party.service';
import {UtilityService} from "../../../../shared/services/utility.service";


declare var dynamoLink: any;

const EMAIL_REGEX = /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,3}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&'])[^ ]{8,}$/;

function passwordMatcher(c: AbstractControl): any | null {
  if (c?.get('matchPassword')?.value !== '') {
    // console.log(c);
    return c?.get('password')?.value === c?.get('matchPassword')?.value ? null : {noMatch: 'password not matching'};
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiService, ScriptLoadService],
})

export class LoginComponent implements OnInit, OnChanges {
  isInstanceAlotted: any = false;
  form: any;
  resetForm: any;
  forgotPass: any = false;
  hide = true;
  viewPass = true;
  passReset = false;
  newToken: any;
  passView = true;
  isSourceMonet: boolean = false;
  cPassView = true;
  loader = false;
termCondition: any = true;

  @Input() instanceStatus: any;
  @Input() term: any;


  constructor(private fb: FormBuilder,
              private as: ApiService,
              private router: Router,
              private sl: ScriptLoadService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private bhvSub: BehaviourSubjectsService,
              private tps: ThirdPartyService,
              private utility: UtilityService) {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
    });
    this.resetForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
        password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]],
        matchPassword: ['', Validators.required],
      },
      {validator: passwordMatcher});

  }

  ngOnInit(): void {
    // debugger
    this.route.queryParams.subscribe((next: any) => {
      if (next && next.token) {
        this.newToken = next.token;
        this.passReset = this.forgotPass = true;
      }
    });
    this.tps.loaderStat.subscribe((next: boolean) => this.loader = next);

  }

  ngOnChanges(sc: SimpleChanges): void {
    if (sc?.instanceStatus) {
      this.isInstanceAlotted = sc.instanceStatus.currentValue;
    }
    if (sc?.term){
      this.termCondition = sc?.term.currentValue;
    }
  }

  signUp(data: any): void {
    this.loader = true;
    if (dynamoLink) {
      this.form.value.source = 'monet';
      this.isSourceMonet = true;
      this.bhvSub.obDynamicLink(`${dynamoLink}`);
      this.tps.loginFunc(this.form.value, 'login');
      
      // notification api added by me
      // if(data){
    //    this.as.getApiStatic(`notification?email=${data.email}`).subscribe((data: any) => {
    //     // console.log('notification',data.data);
    // })
  // }
      // this.gpi.loginFunc(this.form.value, 'static');
    } else {
      console.error('Dynamic Link not available');
    }

  }

  resetPass(data: any): any {
    this.forgotPass = false;
    if (!this.passReset) {
      this.http.put(environment.base + 'forget-password', data).subscribe(
        (response: any) => {
          // console.log(response);
          this.utility.notify(response.message, '');
        },
        (error: any) => {
          console.error(error);
          this.utility.notify(error.message, '');
        });
    } else {
      // console.log(data);
      const resetDataParams = {
        newPassword: data.password,
        confirmNewPassword: data.matchPassword
      };
      this.http.put(environment.base + 'reset-password/' + this.newToken, resetDataParams).subscribe(
        (response: any) => {
          // console.log(response);
          this.utility.notify(response.message, '');
          this.router.navigate(['/']);

        },
        (error: any) => {
          console.error(error.error.message);
          this.utility.notify(error.error.message, '');
          this.router.navigate(['/']);
        });
    }
  }

}
