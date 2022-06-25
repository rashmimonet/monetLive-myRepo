import { Component, NgZone, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilityService} from '../../../../shared/services/utility.service';
import {ApiService} from '../../../../shared/services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviourSubjectsService } from 'src/app/services/behaviour-subjects.service';
import { ThirdPartyService } from 'src/app/modules/shared/services/third-party.service';

declare let gapi: any;
declare let dynamoLink: any;
declare let dynamoIp: any;

// const NAME_REGEX =/^[a-zA-Z][A-Za-z0-9]{2,10}$/;
// const NAME_REGEX = /^[a-zA-Z]{0,19}[\s,][A-Za-z0-9]{0,19}$/;
const NAME_REGEX = /^[a-zA-Z][A-Za-z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
@Component({
  selector: 'app-start-meet',
  templateUrl: './start-meet.component.html',
  styleUrls: ['./start-meet.component.scss'],
  providers: [ApiService, ThirdPartyService]
})
export class StartMeetComponent implements OnInit {
  observerAccess: boolean = false;
  eventForm: FormGroup;
  meetingDuration: number = 0;
  remainingHours: number = 0;
  token: any;
  emailRegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  // nameRegExp = /^[a-zA-Z]{2, }[a-zA-Z0-9]+$/;
  userDetails: any;
  email: any;
  roomId: any;
  dynamicLink: any;
  loggedInService: any;

  inviteRoomObj: any = {
    attendees: [],
    conferenceData: {},
    creator: '',
    creator_ID: '',
    description: '',
    end: { dateTime: '', timeZone: '' },
    id: '',
    link: 'Monet Education',
    recurrence: '',
    reminders: {},
    room: '',
    roomid: '',
    source: '',
    sourceId: '',
    start: { dateTime: new Date(), timeZone: 'Asia/Calcutta' },
    summary: '',
    observerEmail: ''
  };

  roomResponse: any;

  constructor(public dialogRef: MatDialogRef<StartMeetComponent>,  private fb: FormBuilder, private utility: UtilityService, private api: ApiService, private router: Router, 
    private http: HttpClient, private bhvSub: BehaviourSubjectsService, private zone: NgZone, private as: ApiService,  private tps: ThirdPartyService) {
    this.eventForm  = this.fb.group({
      meetingName: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
      observerEmail: [{value: '', disabled: !JSON.parse(localStorage.getItem('userPlanDetails') || '{}').observerAccess}, Validators.pattern(this.emailRegExp)],
    });
  }
  // validationFunc(type: string): boolean {
  //   if (
  //     this.eventForm.controls[type]?.touched &&
  //     this.eventForm.controls[type]?.errors?.required
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  ngOnInit(): void {
   // [{meetingDuration: this.meetingDuration}] = JSON.parse(localStorage.getItem('allPlan') || '[]').filter((plan: any) => plan.name === JSON.parse(localStorage.getItem('userDetails') || '{}').plan.name);
   
   //Commented by me 
  //  this.meetingDuration = JSON.parse(localStorage.getItem('userPlanDetails') || '{}').meetingDuration || 0;
    this.observerAccess =  !JSON.parse(localStorage.getItem('userPlanDetails') || '{}').observerAccess;
  // this.remainingHours =  JSON.parse(localStorage.getItem('userDetails') || '{}').remainingHours || 0;
  //   //Added by me 
  
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.email = this.userDetails.email;
    this.api.getApiStatic(`userplanDetails?email=${this.email}`).subscribe((data: any)=>{
      this.meetingDuration  = data.data[0].meetingDuration || 0;
      // this.observerAccess  = data.data[0].observerAccess;
      // console.log('observe access', this.observerAccess);
      
    })
    this.token = JSON.parse(localStorage.getItem('userDetails') || '{}').token || 0;
    this.api.postApi1('auth/authentication', {token: this.token} ).subscribe((data: any)=>{
      this.remainingHours = data.data.user.remainingHours;
    })
    this.notify();
    this.bhvSub.dynamicLink$.subscribe((link: any) => {
      this.dynamicLink = link;
    });
    this.loggedInService = this.tps.isLoggedIn().service;
  }

  notify(): void {
      if (this.remainingHours <= 5 && this.remainingHours !== 0) {
        this.utility.notify(`You are about to reach your limit of Total Available Hours. Please upgrade your plan`, '');
      }
  }
  create(){
    this.createCall('/teacher/call')
  }
  createCall(card: any): void {
    const { name: creator, email: creator_ID, settings } = JSON.parse(localStorage.getItem('userDetails') || '');
    const data = {
      source: this.loggedInService,
      creator, creator_ID, settings
    };
    this.http.post(`https://www.monetlive.com/${this.dynamicLink}/many/api/createCall`, data).subscribe((next: any) => {
      if (next && next.code === 200) {
        next.response.id = this.utility.create_UUID().replaceAll('-', '');
          if (this.dialogRef) {
            this.startMeeting(next.response, card);
            }
      }
      else {
        console.error('call not created');
        this.utility.notify(`${next.message}`, '');
      }
    });
  }
  startMeeting(room: any, card: any): void {
    this.dialogRef.close({form: this.eventForm.value, status: true});
    this.dialogRef.afterClosed().subscribe((next: any) => {
      this.dialogRef = null;
      if (next && next.form && next.status === true) {
        room.summary = next.form.meetingName;
        room.observerEmail = next.form.observerEmail;
        room.grp = dynamoLink;
        room.instance = dynamoIp;
        room.observerLink = `${location.origin}/monitor?roomid=${room.roomid}&id=${new Date()}&grp=${dynamoLink}&instance=${dynamoIp}&summary=${next.form.meetingName}&duration=${JSON.parse(localStorage.getItem('userPlanDetails') || '{}').meetingDuration}`;
        if (this.inviteRoomObj.link === 'Monet Education') {
          this.inviteRoomObj.description = '<b>Please join the link below</b><br/>'
            + `https://www.monetlive.com/student/login?roomid=`
            + room.roomid + '&room=' + room.room + '&link=' + dynamoLink + '&ip=' + dynamoIp + '<br/>'
            + this.inviteRoomObj.description;
        }
     
        this.inviteRoom(room, { ...this.inviteRoomObj, ...room }, card, '');

      } 
    });
  }
 
  inviteRoom(params: any, data: any, card: any, eventId: any): void {
    data.creator = params.name = JSON.parse(localStorage.getItem('userDetails') || '').name;
    data.creator_ID = JSON.parse(localStorage.getItem('userDetails') || '').email;

    data.groupUid = JSON.parse(localStorage.getItem('userDetails') || '').plan.groupUid;
    data.sourceId = eventId;
    data.source = this.loggedInService;
    this.as.postApi1('inviteRoom', data).subscribe((next: any) => {
      if (!next.error) {
        this.zone.run(() => {
          // tslint:disable-next-line:max-line-length
          this.router.navigate([card], { queryParams: { id: params.id, name: params.name, room: params.room, roomid: params.roomid }, queryParamsHandling: 'merge' });
          this.dialogRef = null;
          
        });
      } else {
        console.error('error creating room');
        this.dialogRef = null;
      }
    });
  }

}
