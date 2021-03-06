import { ChangeDetectorRef, Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallInterface } from '../../../teacher/modules/dashboard/dashboard.component';
import { ApiService } from '../../../shared/services/api.service';
import { MatDialog } from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http';
import { BehaviourSubjectsService } from '../../../../services/behaviour-subjects.service';
import { ThirdPartyService } from '../../../shared/services/third-party.service';
import { StartMeetComponent } from './start-meet/start-meet.component';
import { UtilityService } from '../../../shared/services/utility.service';
import { io } from 'socket.io-client';
import { I } from '@angular/cdk/keycodes';
import { SocketService } from 'src/app/modules/shared/services/socket.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { UserdetailServiceService } from 'src/app/modules/shared/services/userdetail-service.service';



declare let gapi: any;
declare let dynamoLink: any;
declare let dynamoIp: any;
declare let StateSubscription: any;

// const socket: any = io(`wss://www.monetlive.com`, {
//   path: `/sock`,
//   transports: ['websocket'],
// });

@Component({
  selector: 'app-profile-topbar',
  templateUrl: './profile-topbar.component.html',
  styleUrls: ['./profile-topbar.component.scss'],
  providers: [ApiService, ThirdPartyService]
})

export class ProfileTopbarComponent implements OnInit {
  @Output() planTypeData: EventEmitter<any> = new EventEmitter<any>();
  planType: any;
  markId: any;
  roomResponse: any;
  dynamicLink: any;
  email: any;
  search = '';
  // loggedInService = '';
  params: any;
  dialogOpener: any;
  msg: any;
  remainingHours: any = [];
  badge: any;
  dispStdList: boolean = false;
  userDetails: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
  @Output() scheduleEmit = new EventEmitter();
  subSession: any;
  param: any;
  index: any = 0;
  socket: any;
  notification: any;
  notifications: any = [];
  hideMatBadge: boolean = false;
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
  plan: any;


  constructor(private router: Router,
    private route: ActivatedRoute,
    private as: ApiService,
    private dialog: MatDialog,
    private bhvSub: BehaviourSubjectsService,
    private cdref: ChangeDetectorRef,
    private http: HttpClient,
    private tps: ThirdPartyService,
    private zone: NgZone,
    private utility: UtilityService,
    private ss: SocketService,
    private webss: WebsocketService,
    private detailServ: UserdetailServiceService) {
    this.initialSocket();
  }
  initialSocket(): any {
    try {
      this.socket = io('wss://www.monetlive.com', {
        path: '/sock',
        transports: ['websocket'],
      });


    } catch (e) {
      console.error('error connecting socket', e);
    }
    this.socket.on('connection', (e: any) => {
      console.log('socket connection', e);
    });
    this.socket.emit('notify', this.userDetails.email, () => {
    });
    this.socket.on('message', (request: any) => {
      this.notification = request.length;
      this.notifications = request;
      if (this.notification === 0) {
        this.hideMatBadge = true;
      }
      // console.log('notification length', this.notifications);
    });
    this.socket.on('status', (updated: any) => {
      // console.log('status updated', updated);

    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((next: any) => {
      this.params = next;
    });
    // my changes
    this.email = this.userDetails.email;
    this.as.getApiStatic(`userplanDetails?email=${this.email}`).subscribe((data: any) => {
      this.detailServ.myMethod(data);
      this.planType = data.planType;
      this.planTypeEmitter(this.planType);
      if (this.planType !== 'expired') {
        this.plan = data.data[0].name;
      } else {
        this.plan = this.planType;
      }
    });
    // this.notificationDetails();
    this.bhvSub.dynamicLink$.subscribe((link: any) => {
      this.dynamicLink = link;
    });
  }
 
  planTypeEmitter(plan: any) {
    this.planTypeData.emit(plan);
  }
  markAllAsRead(event: any) {
    this.socket.emit('markAllAsRead', this.email, () => {
    })
  }

  markAsRead(event: any) {
    this.socket.emit('markAsread', {
      id: event._id,
      email: this.email
    }, () => { })
  }

  // notificationDetails() {
  //   this.as.getApiStatic(`notificationDetails?email=${this.email}`).subscribe((data: any) => {
  //     if (data.data.length !== 0) {
  //       this.dispStdList = true;
  //       this.badge = data.data.length;
  //       this.msg = '';
  //       for (let i = 0; i < data.data.length; i++) {
  //         this.remainingHours = data.data;
  //         this.markId = data.data[i]._id
  //       }
  //     } else {
  //       this.dispStdList = false;
  //       this.badge = 0;
  //       this.msg = 'No Notification';
  //     }
  //   })
  // }

  // markAllRead(data: any) {
  //   debugger
  //   this.as.putApiStatic(`/markasread?email=${this.email}`, data).subscribe((data: any) => {
  //     console.log('mark', data);
  //     if (!data.error) {
  //       // this.notificationDetails();
  //     } else {
  //       console.log(data.message);

  //     }
  //   });
  // }
  // markRead(data: any) {
  //   debugger
  //   this.as.putApiStatic(`/markasread?id=${data._id}`, data).subscribe((data: any) => {
  //     console.log('mark', data);
  //     if (!data.error) {
  //       // this.notificationDetails();
  //     } else {
  //       console.log(data.message);
  //     }
  //   });
  // }
  scheduleMeeting(): any {
    if (this.planType !== 'expired') {
      let test: any = {
        status: true
      };
      test = Object.assign({}, test);
      this.scheduleEmit.emit(Object.assign(test));
      this.router.navigate(['/profile/dashboard/personal/my_meeting/schedule'], { queryParamsHandling: 'merge' }).then((status: boolean) => {
        console.log('Routing is successful to schedule page', status);
      }).catch((error: any) => {
        console.log('Routing is unsuccessful to schedule page', error);
      });
    }
  }

  // This method is only responsible for opening dialog box for start meeting
  hostMeeting(): any {
    if (this.planType !== 'expired') {
      this.dialogOpener = this.dialog.open(StartMeetComponent, {
        hasBackdrop: true,
        width: '684px',
        height: '550px',
        panelClass: ['startMeet-dialog-container', 'icon-outside'],
        backdropClass: 'startMeetDialogueBackdrop'
      });
    } else {
      // console.log('expired');

    }

    //     // this.createCall('/teacher/call');
  }

  // createCall(card: any): void {
  //   // tslint:disable-next-line:variable-name
  //   const { name: creator, email: creator_ID, settings } = JSON.parse(localStorage.getItem('userDetails') || '');
  //   const data = {
  //     source: this.loggedInService,
  //     creator, creator_ID, settings
  //   };
  //   this.http.post(`https://www.monetlive.com/${this.dynamicLink}/many/api/createCall`, data).subscribe((next: any) => {
  //     if (next && next.code === 200) {
  //       next.response.id = this.utility.create_UUID().replaceAll('-', '');
  //       // console.log('uuid', next.response);
  //       this.roomResponse = next.response;
  //       console.log('resfddf', this.roomResponse);

  //       // if (!this.dialogOpener) {
  //       //   console.log('cc', !this.dialogOpener);

  //       //   this.startMeeting(next.response, card);
  //       //   console.log('create call dialog',  this.startMeeting(next.response, card));

  //       // }
  //     }
  //     else {
  //       console.error('call not created');
  //       this.utility.notify(`${next.message}`, '');
  //     }
  //   });
  // }

  // startMeeting(room: any, card: any): void {
  //   // const date1 = this.as.getLocalStorage('userPlanDetails').meetingDuration;
  //   // const date2 = new Date (date1);
  //   // date2.setMinutes ( date1 + 30 );
  //   // this.inviteRoomObj.end.dateTime = date2;
  //   this.dialogOpener = this.dialog.open(StartMeetComponent, {
  //     hasBackdrop: true,
  //     width: '684px',
  //     height: '550px',
  //     panelClass: ['startMeet-dialog-container', 'icon-outside'],
  //     backdropClass: 'startMeetDialogueBackdrop'
  //   }).afterClosed().subscribe((next: any) => {
  //     console.log('dialogRef', next);

  //     this.dialogOpener = null;
  //     if (next && next.form && next.status === true) {
  //       this.createCall('/teacher/call');
  //       room.summary = next.form.meetingName;
  //       console.log('room summary', room.summary);
  //       room.observerEmail = next.form.observerEmail;
  //       room.grp = dynamoLink;
  //       room.instance = dynamoIp;
  //       room.observerLink = `${location.origin}/monitor?roomid=${room.roomid}&id=${new Date()}&grp=${dynamoLink}&instance=${dynamoIp}&summary=${next.form.meetingName}&duration=${JSON.parse(localStorage.getItem('userPlanDetails') || '{}').meetingDuration}`;
  //       if (this.inviteRoomObj.link === 'Monet Education') {
  //         this.inviteRoomObj.description = '<b>Please join the link below</b><br/>'
  //           + `https://www.monetlive.com/student/login?roomid=`
  //           + room.roomid + '&room=' + room.room + '&link=' + dynamoLink + '&ip=' + dynamoIp + '<br/>'
  //           + this.inviteRoomObj.description;
  //       }

  //       this.inviteRoom(room, { ...this.inviteRoomObj, ...room }, card, '');
  //       // Commented by me
  //       // if (this.tps.isLoggedIn().status && this.tps.isLoggedIn().service === 'google') {
  //       //   // const eventId =  await this.tps.createGoogleCalenderEvent({...this.inviteRoomObj, ...room});
  //       //   this.inviteRoom(room, {...this.inviteRoomObj, ...room}, card, '');
  //       // }
  //       // else if (this.tps.isLoggedIn().status && this.tps.isLoggedIn().service === 'outlook') {
  //       //   // console.log(this.tps.isLoggedIn().service);
  //       //   this.tps.outlookCreateEvent(this.inviteRoomObj.summary, '', new Date(), new Date(), [], '').subscribe((res: any) => {
  //       //     this.inviteRoom(room, {...next.form, ...room}, card,  res.id);
  //       //   });
  //       // }
  //       // else {
  //       //   this.inviteRoom(room, {...this.inviteRoomObj, ...room}, card,  '');
  //       // }

  //     } 
  //   });
  // }

  // inviteRoom(params: any, data: any, card: any, eventId: any): void {
  //   data.creator = params.name = JSON.parse(localStorage.getItem('userDetails') || '').name;
  //   data.creator_ID = JSON.parse(localStorage.getItem('userDetails') || '').email;

  //   data.groupUid = JSON.parse(localStorage.getItem('userDetails') || '').plan.groupUid;
  //   data.sourceId = eventId;
  //   data.source = this.loggedInService;
  //   this.as.postApi1('inviteRoom', data).subscribe((next: any) => {
  //     console.log('invite room', next);

  //     if (!next.error) {
  //       this.zone.run(() => {
  //         // tslint:disable-next-line:max-line-length
  //         this.router.navigate([card], { queryParams: { id: params.id, name: params.name, room: params.room, roomid: params.roomid }, queryParamsHandling: 'merge' });
  //         this.dialogOpener = null;
  //       });
  //     } else {
  //       console.error('error creating room');
  //       this.dialogOpener = null;
  //     }
  //   });
  // }


  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }


}
