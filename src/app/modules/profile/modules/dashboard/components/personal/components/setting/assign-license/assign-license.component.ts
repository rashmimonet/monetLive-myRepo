import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/modules/shared/services/api.service';

@Component({
  selector: 'app-assign-license',
  templateUrl: './assign-license.component.html',
  styleUrls: ['./assign-license.component.scss'],
})
export class AssignLicenseComponent implements OnInit {
  emailForm: any = [1];
  plan: any;
  user: any;
  msgShow: any = {};
  emailAdd = false;
  EMAIL_REGEX = /^[a-zA-Z]+[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]{2,3}$/;

  constructor(private as: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.plan = this.as.getLocalStorage('userPlanDetails');
    this.user = this.as.getLocalStorage('userDetails');
    this.createForm();
  }
  emailAdds(): void {
    this.emailAdd = true;
  }

  createForm(): void {
    this.emailForm = this.fb.group({
      userEmail: [this.user?.email],
      assigneeEmail: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.EMAIL_REGEX),
        ]),
      ],
      planId: [this.user?.plan?.id],
    });
  }

  assignEmail(): void {
    if (this.emailForm.valid) {
      this.as
        .putApi('assignPlan', this.emailForm.value)
        .subscribe((next: any) => {
          if (!next.error) {
            this.user = next.user;
            this.as.storeLocalStorage('userDetails', next.user);
            setTimeout(() => {
              this.msgShow = { msg: '', error: false };
            }, 15000);
          }
          this.msgShow = { msg: next.message, error: next.error };
          let assignControl = this.emailForm.controls.assigneeEmail;
          assignControl.setValue(null);
          assignControl.touched = false;          
        });
    }
  }

  closeMsg(): void {
    this.msgShow = { msg: '', error: false };
  }
}
