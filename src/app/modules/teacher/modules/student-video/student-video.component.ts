/* tslint:disable:max-line-length */
// tslint:disable-next-line:max-line-length
import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketService} from '../../../shared/services/socket.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {BehaviourSubjectsService} from '../../../../services/behaviour-subjects.service';
import {ScriptLoadService} from '../../../shared/services/script-load.service';
import {MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import {number} from '@amcharts/amcharts4/core';
import {DatePipe} from '@angular/common';
import {ConfigureMediaComponent} from '../preview/configure-media/configure-media.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {UtilityService} from '../../../shared/services/utility.service';
import {DialogBoxComponent} from '../../../../components/dialog-box/dialog-box.component';

declare var PubUser: any;
declare var myPubUser: any;
declare var SubUser: any;
declare var StateSubscription: any;
declare var mediaDev: any;
declare var dynamoIp: any;
declare function fetchAvailableInstance(link: string, ip: string): any;



export const listAnimation = trigger('listAnimation', [
  transition(':enter', [
    style({opacity: 0}), animate('300ms', style({opacity: 1}))]
  ),
  transition(':leave',
    [style({opacity: 1}), animate('300ms', style({opacity: 0}))]
  )
]);

@Component({
  selector: 'app-student-video',
  templateUrl: './student-video.component.html',
  styleUrls: ['./student-video.component.scss'],
  providers: [ApiService],
})
export class StudentVideoComponent implements OnInit, AfterViewInit, OnDestroy ,OnChanges {
  @ViewChild('studentContainer') studentContainer: any;
  @ViewChild('screenShareStreem') screenShareStreem: any;
  @ViewChild('audioNotification') audioNotification: any;
  @ViewChild('audioview') audioview: any;
  @ViewChild('scShareAudio') scShareAudio: any;
  faceDataState = true;
  debounce: any;
  timer: any;
  dynamicLink: any;
  userAudioIcon: any = 'mic';
  stopScreenShareButtonStat: any = true;
  dialogOpener: any;
  screenShareAudio: any = true;
  availableMediaDevices: any;
  publisherAvatar: any = true;
  muteAll: any = false;
  publisherScreenShare: any;
  subSession: any;
  opacity: any = false;
  fullScreen: any = false;
  link: any;
  index: any = 0;
  avg: any = [];
  duration = {
    duration: 0
  };
  collapseUsersList: any = {
    action: false,
    icon: 'keyboard_double_arrow_right',
    iconOp: 'keyboard_double_arrow_left'
  };
  moderatorStream: any;
  pub: any;
  randomColor = [0, 0, 0];
  mediaStreamObj: any;
  studentsList: any;
  selectStu: any;
  selectedUserID: any;
  param: any;
  screen: any;
  screenShareId: any;
  json = JSON;
  screenshare: any;
  size = {col: 5, row: 3};
  @Input() configMediaSettings: any;
  @Input() actionObj: any;
  @Input() moderatorObj: any;
  @Input() action: any;
  @Input() module: any;
  @Input() selectUser: any;
  @Input() configurations: any;
  @Input() room: any;
  @Input() Duration: any;
  @Input() stream: any;

  @Output() screenShareStat = new EventEmitter();
  @Output() resetConfigOptions = new EventEmitter();
  @Output() screenShareMediaEmit = new EventEmitter();
  @Output() moderatorMediaEmit = new EventEmitter();
  @Output() studentEmit = new EventEmitter();
  @Output() sideNavSize = new EventEmitter();
  @Output() stopScreenShare = new EventEmitter();
  @Output() toggleSideNav = new EventEmitter();

  constructor(private as: ApiService, private route: ActivatedRoute, private ss: SocketService, private bhvSub: BehaviourSubjectsService,
              private sl: ScriptLoadService, private router: Router, private snackBar: MatSnackBar, private datePipe: DatePipe, private dialog: MatDialog,
              private http: HttpClient, private utility: UtilityService, private cdref: ChangeDetectorRef) {
    this.randomColor = this.generateRandomColor();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  generateRandomColor(): any {
    return [0, 0, 0].map(() => Math.floor(Math.random() * 128));
  }

  collapseList(action: any, option: any): any {
    const usersList = document.getElementById('usersList') as HTMLDivElement;
    if (usersList) {
      if (action) {
        let listWidth = 25;
        const timerColl = setInterval(() => {
          usersList.style.maxWidth = `${listWidth--}%`;
          if (listWidth < 1) {
            usersList.style.opacity = '0';
            usersList.style.visibility = 'hidden';
            clearInterval(timerColl);
          }
        }, 1);
      } else {
        let y = 25;
        let listWidth = 0;
        if (option !== null) {
          y = this.fullScreen ? 100 : 25;
        }
        const timerColl = setInterval(() => {
          usersList.style.maxWidth = `${listWidth++}%`;
          if (listWidth >= y) {
            usersList.style.opacity = '1';
            usersList.style.visibility = 'visible';
            clearInterval(timerColl);
          }
        }, 1);
      }
    }

  }

  mainActions(action: any, stuId?: any): void {
    const actionObj: any = {
      throwChalk: () =>  this.ss.socket.emit('throw-chalk', {sender: this.param.id, receiver: stuId.std_id}),
      exit: () => this.ss.socket.emit('leave', {uuid: stuId.std_id, type: 'webcam'}),
      mic: () => {
        this.ss.socket.emit('toggle-audio', {roomid: this.param.roomid, from: stuId.std_id, status: action.enable});
        this.studentsList.map((std: any) => { if (std.std_id === stuId.std_id) { std.audio = action.enable; } });
      },
      '' : () => {}
        // console.log('')''
    };
    // actionObj.action.value() || actionObj['']();
    actionObj[action.value]() || actionObj['']();
  }

  Menu(val: any): void {
    this.bhvSub.obFullScreen(val);
    this.fullScreen = val;
    if (val) {
      setTimeout(() => {
        const vid = document.getElementById(`webcamvideo`) as HTMLVideoElement;
        // console.log('Video Element : ', vid);
        [vid.width, vid.height, vid.muted, vid.autoplay, vid.srcObject] = [300, 300, true, true, this.moderatorStream];
      }, 500);
    } else {
      this.moderatorMediaEmit.emit(this.moderatorStream);
    }
  }

  stopScreen(): void {
    this.stopScreenShareButtonStat = true;
    this.stopScreenShare.emit(true);
    this.screenShareStat.emit('Share Screen');
    this.ss.socket.emit('stopScreen', {uuid: this.param.id + '___' + this.param.id});
    if (this.screenshare) {
      // this.ss.socket.emit('leave', {uuid: `${this.param.id}___${this.param.id}`}); //this statement is moved from outside if to inside
      this.publisherScreenShare.destroy('screen');
    }
    [this.screen, this.screenshare, this.screenShareId] = [undefined, undefined, undefined];
    this.toggleSideNav.emit(true);
    this.bhvSub.obScreenShare(false);
  }

  showSelectUser(id: any, addBorders: any): void {
    [this.selectedUserID, this.selectStu] = [id, addBorders];
  }

  startTimer(): void {
    if (this.duration.duration === 0) {
      this.timer = setInterval(() => {
        this.duration.duration++;
        this.avg.map((el: any) => {
          this.showSelectUser(el.id, el.score > 30);
        });
      }, 2000);
    }
  }

  ngOnChanges(sc: SimpleChanges): any {
    if (sc?.selectUser && sc.selectUser?.currentValue && this.studentsList && this.studentsList.lenght > 1) {
      this.showSelectUser(sc.selectUser.currentValue.std_id, sc.selectUser.currentValue.fromSidenav);
    }
    if (sc.screenshare && sc.screenshare?.currentValue === false) {
       this.screen = undefined;
    }

    if (sc.actionObj && sc?.actionObj?.currentValue) {
      this.actionsHandler(sc?.actionObj?.currentValue?.name, sc?.actionObj?.currentValue?.value);
    }

    if (sc?.configMediaSettings?.currentValue !== undefined && sc?.configMediaSettings?.currentValue === true) {
      this.availableMediaDevices = mediaDev.availableDevices;
      this.configMediaoptions();
    }
  }

  actionsHandler(action: string, value: boolean): any {
    const actionObj: any = {
      video: () => {
        this.pub.toggleVideo('webcam', value);
        this.studentsList.map((std: any) => {
          if (std.std_id === this.param.id) { std.video = this.publisherAvatar = value; }
        });
      },
      audio: () => {
        this.userAudioIcon = value ? 'mic' : 'mic_off';
        this.pub.toggleAudio('webcam', value);
      },
      screen: () => {
        value ? (
          this.publisherScreenShare = new PubUser(this.param.name + '(screen)', this.param.id + '___' + this.param.id, this.param.roomid, 'student', null, this.ss.socket, 'screen', null, '', true),
          this.publisherScreenShare.on('screen-share-denied', (err: Error, userID: string) => this.ss.socket.emit('leave', {uuid: userID, type: 'webcam'})),
          this.publisherScreenShare.sock = this.ss.socket,
          this.publisherScreenShare.connect()
        ) : (this.stopScreen());
      },
      leave: () => {
        this.openDialog();
      },
      endRoom: () => {
          this.moderatorLeave(false);
      },
      muteRoom: () => this.muteAllParticipants(),
      'toggle-view': () => this.Menu(value),
      '': () => {}
    };
    actionObj[action]() || actionObj['']();
  }
  // tslint:disable-next-line:typedef
  openDialog() {
    let dialogRef = this.dialog.open(DialogBoxComponent, { height: '25%', width: '25%'});

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.moderatorLeave(true);
      }
      dialogRef = null;
    });
  }
  moderatorLeave(fromAction: boolean): void {
    this.pub.destroy();
    this.sendToAdmin();
    this.stopScreen();
    if (dynamoIp) {
      // console.log('DynamoIp :', dynamoIp);
      //this.http.get('http://localhost:8092/many/api/freeInstance?secret=janusoverlord&ip=' + dynamoIp).subscribe(() => {});
    }
    else {
      // console.warn('dynamoIp not available');
    }
      this.ss.socket.emit('endRoom', {roomid: this.param.room});
    this.ss.socket.emit('leave', {uuid: this.param.id, type: 'webcam'});
    this.router.navigate(['report'], {queryParams: {roomid: this.param.roomid}}).then(() => {});
  }

  configMediaoptions(): any {
    if (this.availableMediaDevices) {
      this.dialogOpener = this.dialog.open(ConfigureMediaComponent, {
        data: {devicesList: this.availableMediaDevices},
        panelClass: 'configDevice-dialog-container',
        hasBackdrop: true,
        width: '23%',
        height: 'auto',
        backdropClass: 'backdropBackground'
      }).afterClosed().subscribe((next: any) => {
        this.resetConfigOptions.emit(false);
        this.dialogOpener = null;
        if (next.result) {
          mediaDev.deltaMedia(next.result.label, next.result.id);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.timer && clearInterval(this.timer);
    this.debounce && clearTimeout(this.debounce);
  }

  tryAgain(): void {
    this.ss.socket.connect();
    this.router.navigate(['/teacher/call'], {queryParamsHandling: "merge"});
      this.as.getApiStatic(`getRoomIp?roomid=${this.param.roomid}`).subscribe((ip: any) => {
        // console.log('GetRoomIP Response : ', ip);
        fetchAvailableInstance(ip.room.grp, ip.room.instance);
        // this.ss.generateSocket();
        this.bhvSub.obDynamicLink(ip.room.grp);
    });

  }

  muteAllParticipants(): any  {
    this.muteAll = !this.muteAll;
    const data: any = {
      status: this.muteAll ? 'mute_room' : 'unmute_room',
      room: this.param.room,
      uuid: this.param.id
    };
    this.as.postApi('muteRoom', data).subscribe(() => {});
  }

  sendToAdmin(): any {
    const meetingDetails: any = {Admin: '', Name: '', Summary: '', Attendees: number, Link: '', Date: ''};
    this.as.getApi('getInviteRoom?roomid=' + this.param.roomid).subscribe(next => {
      if (next && next.response) {
        const attendeesLength = next.response.attendees.filter((el: any) => el && !el.includes('(screen)')).length;
        // const {start: { dateTime: startDate} , creator_ID, creator, summary, attendees: {length: attendeesLength}, roomid} = next.response;
        const {start: { dateTime: startDate} , creator_ID, creator, summary, roomid} = next.response;
        const d1 = new Date();
        const d2 = new Date(startDate);
        const difference = Math.abs(d1.getTime() - d2.getTime()) / 1000; // milliseconds
        meetingDetails.Admin = creator_ID;
        meetingDetails.Name = creator;
        meetingDetails.Summary = summary;
        const timeArray = this.utility.convertDate(difference, difference).split(':');
        meetingDetails.Duration = timeArray.length === 2 ? `${timeArray[0]}min ${timeArray[1]}sec` : `${timeArray[0]}hr ${timeArray[1]}min ${timeArray[2]}sec`;
        meetingDetails.Attendees = attendeesLength;
        meetingDetails.Link = `https://www.monetlive.com/report/dashboard?roomid=${roomid}`;
        meetingDetails.Date = this.datePipe.transform(new Date(startDate), 'medium');
        meetingDetails.RoomId = roomid;
        this.as.postApiStatic('sendAdminEmail', meetingDetails)
          .subscribe((success: any) => console.log('Send Email Response :', success));

        this.as.putApiStatic('updateMeetingHours', {user: JSON.parse(localStorage.getItem('userDetails') || '{}'), hours: (difference / 3600).toFixed(2)})
          .subscribe((success: any) => {
            // console.log('updateMeetingHours',success);
          });
      }
    });
  }

  managePublisher(): any {
    // console.warn('Manage Publisher');
    this.pub = myPubUser = new PubUser(this.param.name, this.param.id, this.param.roomid, 'teacher', null, this.ss.socket, 'webcam', mediaDev.mediaStream, JSON.parse(localStorage.getItem('userDetails') || '').email, true);
    this.moderatorStream = mediaDev.mediaStream;
    this.pub.newAudioStatus = this.configurations.audio;
    this.pub.newVideoStatus = this.configurations.video;
    this.pub.sendSpeakingInfo();
    this.publisherStreamHandler(this.moderatorStream);
    this.pub.on('local', (type: string, stream: MediaStream) => {
      // console.warn('Pub.on (Local) :', stream);
      /*this.moderatorStream = stream;
      this.publisherStreamHandler(this.moderatorStream);*/
      this.Menu(true);
      this.publisherAvatar = this.configurations.video;
      // this.studentsList.push({ audio: this.configurations.audio, engAvg: NaN, msobj: null, screen: null, video: this.configurations.video, webcam: true, name: this.param.name, proctor: 'proctor', roomid: this.param.roomid, serverIP: null, time: null, std_id: this.param.id });
      let moderatorExist = this.studentsList.findIndex((user: any) => user && user.std_id === this.param.id);
      if (moderatorExist === -1) {
        this.studentsList.push({ audio: this.configurations.audio, engAvg: NaN, msobj: null, screen: null, video: this.configurations.video, webcam: true, name: this.param.name, proctor: 'proctor', roomid: this.param.roomid, serverIP: null, time: null, std_id: this.param.id });
      }
      this.studentEmit.emit(this.studentsList);
    });
    this.studentEmit.emit(this.studentsList);
    this.getUsers(this.param.roomid);
    this.pub.on('remote', async (type: string, media: MediaStream) => { // Audio Media Stream Object
      this.audioview?.nativeElement ? (this.audioview.nativeElement.srcObject = await media) : (console.error('Audio Element not found'));
    });
    this.pub.on('toggleVideo', (e: any) => {
      this.studentsList.map((std: any) => {
        if (std.std_id === e.from) { std.video = e.status; }
      });
    });
    this.pub.on('toggleAudio', (e: any) => {
      this.studentsList.map((std: any) => {
        if (std.std_id === e.from) { std.audio = e.status; }
      });
    });
    this.pub.sock = this.ss.socket;
    this.pub.connect();
  }

  socketEventListeners(event: any, data: any): any {
    // console.log('Debugging student list', this.studentsList);
    const eventObj: any = {
      'user-list': () => {
        const usersList = data.users.filter((std: any) => std?.uuid?.search(this.param.id) === -1);
        if (usersList.length > 0) {
          for (const std of usersList) {
            const sub = new SubUser(std.name, Math.floor(Math.random() * 100000), std.roomid, 'dummy', std.serverIP, this.ss.socket, std.uuid);
            sub.on('remote', (user: object, type: string, stream: MediaStream) => {
              this.studentsList.map((student: any) => {
                if (student.std_id === std.uuid) { student.msobj = stream; }
              });
              const ind = this.studentsList.findIndex((m: any) => m.proctor === 'teacher');
              this.studentsList.unshift(this.studentsList.splice(ind, 1)[0]);
              this.mediaStreamObj = stream;
            });
            sub.sock = this.ss.socket;
            sub.connect();
          }
        }
        console.log('Students-List =>', this.studentsList);
      },
      'face-data': () => {
        if (data) {
          this.faceDataState = true;
          this.studentsList = this.studentsList.map((std: any) => {
            std.engagement = Math.floor(data[std?.std_id]?.engagement || 0);
            std.mood = Math.floor(data[std?.std_id]?.mood_score || 0);
            std.category_engagement = std.engagement > 80 ? 'High' : std.engagement > 40 ? 'Medium' : 'Low';
            std.category_mood = std.mood > 80 ? 'High' : std.mood > 40 ? 'Medium' : 'Low';
            return std;
          });
          this.studentEmit.emit(this.studentsList);
          if (this.debounce) {
            clearTimeout(this.debounce);
          }
          // this.debounce = setTimeout(() => {
          //   this.faceDataState = false;
          // }, 30000);
        }
      },
      'raise-hand': () => {
        this.studentsList = this.studentsList.map((userId: any) => {
          if (userId.std_id === data.from) {
            userId.raiseHand = data.status;
            this.selectUser = this.studentsList.filter((std: any) => std.std_id === data.from)[0];
            this.showSelectUser(data.from, false);
            this.utility.notify(data.status === true ? data.name + ' raised his/her hand' : data.name + ' put his/her hand down', '');
          }
          return userId;
        });
      },
      leave: () => {
        if (Object.keys(data?.userObj).length) {
          this.studentsList = this.studentsList.filter((user: any) => user.std_id !== data.userObj?.uuid);
          if (data?.userObj?.janus?.screen === false && data?.userObj?.uuid.includes('___')) {
            this.screenShareStat.emit('Share Screen');
            this.collapseList(false, true);
            this.bhvSub.obScreenShare(false);
            [this.screen, this.screenshare, this.screenShareId] = [undefined, undefined, undefined];
          }
          this.studentEmit.emit(this.studentsList);
          this.utility.notify(data.userObj.name + (data?.userObj?.uuid.includes('___') ? ' stopped sharing screen' : ' left the call'), '');
        }
      },
      'room-audio': () => {
        this.userAudioIcon = data.mute ? 'mic_off' : 'mic';
        this.utility.notify(data.mute ? 'Room muted' : 'Room  un-muted', '');
        this.studentsList = this.studentsList.map((el: any) => {
          el.audio = !data.mute;
          return el;
        });
      },
      'screen-share': () => {
        this.utility.notify('Screen is already being shared by someone', '');
        [this.screen, this.screenshare, this.screenShareId] = [undefined, undefined, undefined];
        this.bhvSub.obScreenShare(false);
      },
      'join-request': () => this.bhvSub.obAddToWaitingList({userName: data.name, userId: data.uuid, socketId: data.sid}),
      '': () => {},
    };

    eventObj[event] && eventObj[event]() || eventObj['']();
  }

  getSubscribedUsers(type: any, stream: any, sub: any, slot: any, mid: any, user: any): any {
    if (type === 'audio' && stream !== null) {
      this.scShareAudio.nativeElement.srcObject = stream;
    }
    const exists = this.studentsList.find((r: any) => r.std_id === sub.uuid);
    if (!exists) {
      this.studentsList.push({ audio: user.janus.audio, engAvg: NaN, msobj: stream, screen: user.janus.screen, video: user.janus.video, webcam: user.janus.webcam, name: user.name, proctor: user.proctor, roomid: user.janus.room, serverIP: null, time: null, std_id: sub.uuid });
      this.utility.notify(user.name + ' Joined the call', '');
    } else {
      exists.msobj = stream;
    }

    this.studentsList.forEach((std: any, i: any) => {
      if (std.std_id.includes('___')) {
        this.studentsList = this.studentsList.filter((stu: any) => stu?.std_id?.indexOf('___') === -1);
        if (std?.std_id !== this.param.id + '___' + this.param.id) {
          this.screenShareMediaEmit.emit(std.msobj);
        }
        this.bhvSub.obScreenShare(true);
        if ((this.param.id + '___' + this.param.id) === sub.uuid) {
          [this.screen, this.screenshare, this.screenShareId] = [1, true, this.param.id + '___' + this.param.id];
        }
        [this.screenshare, this.screen] = [true, 1];
        setTimeout(() => {
          const vid = document.getElementById(`screenShareStreem`) as HTMLVideoElement;
          vid.srcObject = std.msobj;
          this.utility.notify(user.name + ' Shared his/her screen', '');
          this.screenShareStat.emit((this.param.id + '___' + this.param.id) === sub.uuid ? { type: 'Self', Name: this.param.name } : {type: 'Other', Name: user.name});
        }, 1000);
        this.stopScreenShareButtonStat = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(next => {
       this.link = window?.location?.href?.split('#')[0] + '#/' + 'student/login?roomid=' + next?.roomid + '&room=' + next?.room;
      this.param = next;
      this.ss.generateSocket();
      if (this.dynamicLink) {
        this.subSession = new StateSubscription(`wss://www.monetlive.com/${this.dynamicLink}/rtc/`, this.param.id, parseInt(this.param.room, 10), this.ss.socket);
        this.subSession.start();
        this.managePublisher();
      }
      else {
        console.error('Dynamic Link not found');
      }
      this.ss.socket.onAny((eventName: any, data: any) => {
        this.socketEventListeners(eventName, data);
      });
    });
    // @ts-ignore
    this.subSession.on('remote', ({type, stream, slot, mid, sub, user}) => {
      console.log('State Subscription (remote) : ', user);
      this.getSubscribedUsers(type, stream, sub, slot, mid, user);
    });
    this.studentEmit.emit(this.studentsList);
  }

  trackByUsers(index: number, users: any): any {
    if (users?.std_id) {
      return users.std_id;
    }
  }

  ngOnInit(): void {
    this.sl.load('janus').then(() =>  this.sl.load('user').then(() => {}));
    this.startTimer();
    this.bhvSub.fullScreen$.subscribe((data: any) => {
      this.fullScreen = data;
      if (data) {
      }
    });
    this.bhvSub.screenShare$.subscribe((data: any) => {
      if (data !== '') {
        this.opacity = data;
      }
    });
    this.bhvSub.faceData$.subscribe((state: boolean) => {
      console.log('FaceDataFromBehaviourSubject-teacher side',state)
      this.faceDataState = state;
    });
    mediaDev.on('media', (media: any) => {
      const vid = document.getElementById(`webcamvideo`) as HTMLVideoElement;
      if (vid) {
        vid.srcObject = media;
      }
    });
    mediaDev.on('media-error', (error: any) => {
      console.log('media-error :', error);
      //this.utility.notify('We have encountered an issue with your camera. Please adjust your camera settings and try again.', 'Okay');
      this.router.navigate(['/auth']);
    });

    this.bhvSub.dynamicLink$.subscribe((link: any) => {
      console.log('Moderator - dynamic link :', link);
      this.dynamicLink = link;
    });
  }

  async publisherStreamHandler(stream: MediaStream): Promise<any> {
    this.cdref.detectChanges();
    let vidElement: HTMLVideoElement;
    vidElement = await document.getElementById(`webcamvideo`) as HTMLVideoElement;
    console.log('Publisher Video Element : ', vidElement);
    [vidElement.width, vidElement.height, vidElement.muted, vidElement.autoplay, vidElement.srcObject] = [300, 300, false, true, this.moderatorStream];
    // return vidElement;
  }

  getUsers(roomId: any): void {
    this.as.getApi('user_list?id=' + roomId).subscribe((success: any) => {
      if (success) {
        success.response = success.response.filter((fl: any) => {
          if (fl.screen && fl.active) {
            [this.screen, this.screenshare, this.screenShareId] = [1, true, fl.std_id];
          }
          return !fl.screen && fl.active;
        });
        if (success.response.length > 1) {
          const id = success.response.findIndex((m: any) => m.std_id === this.param.id);
          success.response.unshift(success.response.splice(id, 1)[0]);
          const i = success.response.findIndex((m: any) => m.proctor === 'proctor');
          success.response.unshift(success.response.splice(i, 1)[0]);
        }
        if (this.selectUser) {
          const id = this.selectUser.std_id;
          if (success.response.length > 1) {
            const ind = success.response.findIndex((m: any) => m.std_id === id);
            success.response.unshift(success.response.splice(ind, 1)[0]);
          }
        }
        this.studentsList = success.response;
        this.studentEmit.emit(this.studentsList);
      }
    });
  }

  scrollList(pos: any): any {
      const el = document.getElementById('list') as HTMLDivElement;
      el.scrollTop = pos === 'top' ? el.scrollTop - 200 : el.scrollTop + 200;
  }

}

/** Component opened inside a snackbar. */
@Component({
  selector: 'app-countdown-snackbar',
  template: `
    <div style="text-align: center; display: inline-flex">
      <mat-icon>account_circle</mat-icon>
      <div style="line-height: 2">
        &nbsp;&nbsp;<b>{{ data }}</b> joined the Call
      </div>
    </div>
  `,
})
export class CountdownSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
  }
}

