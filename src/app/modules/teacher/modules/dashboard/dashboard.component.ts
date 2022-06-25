import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddEventComponent} from '../schedule/calendar/add-event/add-event.component';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ThirdPartyService} from '../../../shared/services/third-party.service';
import {UtilityService} from "../../../shared/services/utility.service";
declare var gapi: any;
export interface CallResponse {
  id: string;
  roomId: number;
}

export interface CallInterface {
  response: CallResponse;
  code: number;
  message: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ApiService, ThirdPartyService]
})
export class DashboardComponent implements OnInit {
  params: any;
  loggedInService = '';
  cards = [
    {name: 'Schedule Class', route: 'teacher/scheduler', icon: 'schedule', value: 'schedule', disabled: false},
    {name: 'Start Class', route: 'teacher/call', icon: 'layers', value: 'start', disabled: false},
    {name: 'Reports', route: 'report', icon: 'donut_small', value: 'report', disabled: false},
  ];
  dialogOpener: any;
  env = environment;
  constructor(private as: ApiService,
              private router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private http: HttpClient,
              private tps: ThirdPartyService,
              private utility: UtilityService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((next: any) => {
      this.params = next;
    });
    this.loggedInService = this.tps.isLoggedIn().service;
  }

  callActions(card: any): void {
    switch (card.value) {
      case 'start': {
        this.createCall(card);
        break;
      }
      default: {
        this.router.navigate([card.route], {queryParamsHandling: 'merge'});
        break;
      }
    }
  }
  createCall(card: any): void {
    // tslint:disable-next-line:variable-name
    const {name: creator, email: creator_ID, settings} = JSON.parse(localStorage.getItem('userDetails') || '');
    const data = {
      source: this.loggedInService,
      creator, creator_ID, settings
    };
    this.as.postApi('createCall', data).subscribe((next: CallInterface) => {
      if (next && next.code === 200) {
        next.response.id = this.utility.create_UUID().replaceAll('-', '');
        if (!this.dialogOpener) {
          this.addEvent(next.response, card);
        }
      }
      else {
        console.error('Call not created');
      }
    });
  }
  addEvent(room: any, card: any): void {
    this.dialogOpener = this.dialog.open(AddEventComponent, {
      hasBackdrop: false,
      width: '500px',
      height: 'auto',
      backdropClass: 'backdropBackground'
    }).afterClosed().subscribe((next: any) => {
      this.dialogOpener = null;
      if (next) {
        const emails: any = [];
        next.emails.map((m: any, i: number) => {
          emails[i] = {email: m.toString().trim()};
        });
        next.form.attendees = emails;
        if (next.form.link === 'Monet Education') {
          /*next.form.conferenceData.entryPoints[0].uri = next.url;
          next.form.conferenceData.entryPoints[0].label = next.url;*/
          next.form.description = '<b>Please join the link below</b><br/>'
            // + 'https://wrtc.monetanalytics.com/monet-live-v2/student/login?roomid='
            + `https://dev.monetrewards.com/${environment.serverName}/student/login?roomid=`
            + room.roomid + '&room=' + room.room + '<br/>'
            + next.form.description;
          delete next.form.conferenceData.createRequest;
        }
        gapi.client?.calendar?.events?.insert({
          calendarId: 'primary',
          sendNotifications: true,
          sendUpdates: 'all',
          conferenceDataVersion: 1,
          resource: next.form
        }).execute((eve: any) => {
          this.inviteRoom(room, {...next.form, ...room}, card, eve?.id);
        });
      }
    });
  }
  inviteRoom(room: any, data: any, card: any, eventId: any): void {
    data.creator = this.params.name;
    data.creator_ID = JSON.parse(localStorage.getItem('userDetails') || '').email;
    data.sourceId = eventId;
    data.source = this.loggedInService;
    room.name = this.params.name;
    this.as.postApi1('inviteRoom', data).subscribe((next: any) => {
      if (!next.error) {
        // console.warn(card.route, room);
        this.router.navigate([card.route], {queryParams: room, queryParamsHandling: 'merge'});
        this.dialogOpener = null;
      } else {
        console.error('error creating room');
        this.dialogOpener = null;
      }
    });
  }

}
