import { Component, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../../../../shared/services/api.service';
import { ThirdPartyService } from '../../../../../../../../../shared/services/third-party.service';
import { Router } from '@angular/router';
import { UtilityService } from "../../../../../../../../../shared/services/utility.service";

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.scss'],
  providers: [ThirdPartyService],
})
export class ScheduleMeetingComponent implements OnInit {

  loggedInService = '';
  eventData: any;
  apiLength: boolean = false;
  loader = false;
  deleteEventId: any;
  isSignedIn: any = false;
  upcoming: any;
  past: any;
  inviteRoomObj: any = {
    attendees: [],
    conferenceData: {},
    creator: JSON.parse(localStorage.getItem('userDetails') || '').name,
    creator_ID: JSON.parse(localStorage.getItem('userDetails') || '').email,
    description: '',
    end: { dateTime: new Date(), timeZone: 'Asia/Calcutta' },
    id: '',
    link: 'Monet Education',
    recurrence: '',
    reminders: {},
    room: '',
    roomid: '',
    source: 'monet',
    sourceId: '',
    start: { dateTime: new Date(), timeZone: 'Asia/Calcutta' },
    summary: '',
  };

  constructor(
    private zone: NgZone,
    private api: ApiService,
    private tps: ThirdPartyService,
    private router: Router,
    private utility: UtilityService
  ) {
  }

  ngOnInit(): void {
    if (this.tps.isLoggedIn().status) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
    this.loader = true;
    this.loggedInService = this.tps.isLoggedIn().service;
  }

  trackByMeetingId(index: number, meetingObj: any): any {
    if (meetingObj._id) {
      return meetingObj;
    }
  }

  getEvents(e: any): void {
    if (this.loggedInService === 'google') {
      this.zone.run(() => {
        this.getRooms();
      });
    }
  }

  getOutlookEvents(e: any): void {
    if (this.loggedInService === 'outlook') {
      this.zone.run(() => {
        this.getRooms();
      });
    }
  }

  getRooms(): void {
    const postData = {
      email: JSON.parse(localStorage.getItem('userDetails') || '').email,
      source: this.loggedInService,
    };
    // this.api.postApi1('getAllInviteRooms', postData).subscribe((next) => {
    this.api.postApi1('getAllScheduleInviteRooms', postData).subscribe((next) => {
      if (!next.error) {
        this.apiLength = true;
        const data = next.response.filter((item: any) => {
          item.start.dateTime = new Date(item.start.dateTime).getTime();
          item.end.dateTime = new Date(item.end.dateTime).getTime();
          item.now = JSON.stringify(new Date().getTime());
          return item.summary;
        });
        this.eventData = data.sort((a: any, b: any) => {
          return b.start.dateTime - a.start.dateTime;
        }); 
        this.upcoming = this.eventData?.slice().reverse();
        this.past = this.reportDataFilter(this.eventData);
      }else{
        console.log('api null length', next.message);
        this.apiLength = false;
      }
      this.loader = false;
    });
  }

  reportDataFilter(allData: any): any {
    return allData.filter((item: any) => item.alive === 2);
  }
  deleteEvent(e: any): void {
    this.deleteEventId = e;
  }

  OutlookLogin(): void {
    this.isSignedIn = this.tps.outlookLogin();
  }

  GoogleLogin(): void {
    this.tps.googleLogIn((init: any) => this.zone.run(() => {
      this.isSignedIn = init;
      this.loggedInService = 'google';
    }));
  }

  StartMeeting(meetingObj: any): void {
    // meetingObj.id = Math.floor(Math.random() * 1000000);
    meetingObj.id = this.utility.create_UUID();
    meetingObj.name = JSON.parse(
      localStorage.getItem('userDetails') || ''
    ).name;
    if (dynamoIp !== undefined && dynamoLink !== undefined) {
      meetingObj.grp = dynamoLink;
      meetingObj.instance = dynamoIp;
      meetingObj.observerLink = `${location.origin}/monitor?roomid=${meetingObj.roomid
        }&id=${new Date()}&grp=${dynamoLink}&instance=${dynamoIp}&summary=${meetingObj.summary
        }&duration=${JSON.parse(localStorage.getItem('userPlanDetails') || '{}')
          .meetingDuration
        }`;
    } else {
      // console.warn('Dynamic Link & IP could not be found');
    }

    this.api.postApi1('inviteRoom', meetingObj).subscribe((next: any) => {
      if (!next.error) {
        this.zone.run(() => {
          this.router.navigate(['/teacher/call'], {
            queryParams: { id: meetingObj.id, name: meetingObj.name, room: meetingObj.room, roomid: meetingObj.roomid },
            queryParamsHandling: 'merge',
          });
        });
      } else {
        console.error('error creating room');
      }
    });
  }

  viewReport(roomId: any): void {
      const URL = `${window.location.origin
        }/report/dashboard?roomid=${roomId}&id=${new Date()}`;
      window.open(URL);
    }
  
}

declare let dynamoLink: any;
declare let dynamoIp: any;
