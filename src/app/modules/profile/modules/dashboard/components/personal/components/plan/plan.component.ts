import { I } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../../../../shared/services/api.service';
import { UtilityService } from "../../../../../../../shared/services/utility.service";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  paymentHandler: any = null;
  email: any;
  planValidity: any;
  user: any;
  planType = 'payAs';
  confirmPayment = false;
  getPlans: any = [];
  planKeys = [
    {
      name: ''
    },
    {
      name: 'Choose Your Plan that fits your Requirement',
      height: true
    },
    {
      name: ''
    },
    {
      name: 'Participant Capacity',
      planMatch: 'participantCapacity',
    },
    {
      name: 'License Count',
      planMatch: 'licenseCount',
    },
    {
      name: 'Meeting Duration (In Minutes)',
      planMatch: 'meetingDuration',
    },
    {
      name: 'No of Meeting Hours(Per Month)',
      planMatch: 'noOfMeetingHours',
    },
    {
      name: 'Waiting room',
      planMatch: 'waitingRoom',
    },
    {
      name: 'Real Time Scores(In Seconds) ',
      planMatch: 'realTimeScores',
    },
    {
      name: 'Post Meeting Analytics',
      planMatch: 'postMeetingAnalytics',
    },
    {
      name: 'Recording ',
      planMatch: 'recording',
    },
    {
      name: 'Observer Access',
      planMatch: 'observerAccess',
    },
    {
      name: 'Technical support',
      planMatch: 'technicalSupport',
    },
    {
      name: '',
    },
  ];

  constructor(private router: Router, private as: ApiService, private utility: UtilityService) { }

  ngOnInit(): void {
    this.user = this.as.getLocalStorage('userDetails');
    this.email = this.user.email
    // console.log('email', this.email);
    this.as.getApiStatic(`userplanDetails?email=${this.email}`).subscribe((data: any) => {
      this.planValidity = data.planType;
      // console.log('plan', this.planValidity);
      this.getPlan();
    });

  }

  getPlan(): any {
    this.getPlans = this.as.getLocalStorage('allPlan');
    if (!this.getPlans) {
      this.as.getApi('getAllPlans').subscribe((next) => {
        if (!next.error) {
          this.getPlans = next.plans;
          this.modifyPlan(this.getPlans);
        } else {
          this.utility.notify(next.message, 'error');
        }
      });
    }
    this.modifyPlan(this.getPlans);
  }

  modifyPlan(plans: any): void {
    if (plans) {
      this.getPlans = plans.map((p: any) => {
        if (p.planUid > this.user.plan.planUid) {
          p.button = 'Upgrade';
        }
        else {
          p.button = 'Downgrade';
        }

        if (p.planUid === 0 && this.user.plan.planUid > 0) p.hide = true;
        // console.log('plan2', this.planValidity);
        if (p.planUid === this.user.plan.planUid && this.planValidity === 'purchased') {
          p.button = 'In Use',
            p.backGround = 'rgba(173, 252, 203, 0.41)';
          p.class = 'selectedUpgrade';
        }
        else if (p.planUid === this.user.plan.planUid && this.planValidity === 'expired') {
          p.button = 'Renew'
          p.backGround = 'rgba(173, 252, 203, 0.41)';
          p.class = 'renewPlan';
        } else {
          p.backGround = 'rgba(123, 128, 129, 0.31)';
          p.class = 'upgradePlan';
        }
        return p;
      });

      this.as.storeLocalStorage('allPlan', this.getPlans);
    }
  }

  planShow = (type: string) => {
    this.planType = type;
  }

  planUpgrade = (plan: any) => {
    if (this.user.plan.planUid !== plan.planUid) {
      this.as.storeLocalStorage('planUpgrade', plan);
      this.router.navigate(['profile/dashboard/payCard']);
    } else if (this.user.plan.planUid === plan.planUid && this.planValidity === 'expired') {
      this.as.storeLocalStorage('planUpgrade', plan);
      this.router.navigate(['profile/dashboard/payCard']);
    }
  }
}
