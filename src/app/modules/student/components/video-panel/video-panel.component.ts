import {
  AfterViewInit,
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
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SocketService} from '../../../shared/services/socket.service';
import {BehaviourSubjectsService} from '../../../../services/behaviour-subjects.service';
import {ConfigureMediaComponent} from '../../../teacher/modules/preview/configure-media/configure-media.component';
import {UtilityService} from "../../../shared/services/utility.service";
import {DialogBoxComponent} from '../../../../components/dialog-box/dialog-box.component';

declare var PubUser: any;
declare var myPubUser: any;
declare var SubUser: any;
declare var StateSubscription: any;
declare var mediaDev: any;
declare var inSession: boolean;
declare var studentStream: any;

declare function fetchAvailableInstance(link: string, ip: string): any;


@Component({
  selector: 'app-video-panel',
  templateUrl: './video-panel.component.html',
  styleUrls: ['./video-panel.component.scss'],
  providers: [ApiService],
})
export class VideoPanelComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('studentContainer') studentContainer: any;
  @ViewChild('screenShareStreem') screenShareStreem: any;
  @ViewChild('audioview') audioview: any;
  @ViewChild('scShareAudio') scShareAudio: any;

  timer: any;
  dialogOpener: any;
  screenShareAudio: any = true;
  userAudioIcon: any = 'mic';
  dynamicLink: any;
  faceDataState = true;
  debounce: any;

  stopScreenShareButtonStat: any = true;

  test: any = false;
  availableMediaDevices: any;
  collapseUsersList: any = {
    action: false,
    icon: 'keyboard_double_arrow_right',
    iconOp: 'keyboard_double_arrow_left'
  };
  publisherAvatar: any = true;
  publisherScreenShare: any;
  randomColor = [0, 0, 0];
  subSession: any;
  avg: any = [];
  opacity: any = false;
  fullScreen: any = false;
  userStream: any;
  screenshare: any;
  duration = {duration: 0};
  selectStu: any;
  selectedUserID: any;
  index: any = 0;
  AudioArr: any = [];
  // subscribersArr: any = [];
  // sub: any;
  pub: any;
  check: any = [];
  mediaStreamObj: any;
  studentsList: any;
  param: any;
  screen: any;
  screenShareId: any;
  // interval: any;
  // conf: any;
  action: any;
  studentID: any;
  // activeUsers: any = [];
  json = JSON;
  size = {col: 5, row: 3};
  @Input() configMediaSettings: any;
  @Input() actionObj: any;
  @Input() module: any;
  @Input() actions: any;
  @Input() selectUser: any;
  @Input() room: any;
  @Input() Duration: any;

  @Output() screenShareStat = new EventEmitter();
  @Output() resetConfigOptions = new EventEmitter();
  @Output() screenShareMediaEmit = new EventEmitter();
  @Output() userMediaEmit = new EventEmitter();
  @Output() audioStatus = new EventEmitter();
  @Output() studentEmit = new EventEmitter();
  @Output() stopScreenShare = new EventEmitter();

  constructor(private as: ApiService, private route: ActivatedRoute, private bhvSub: BehaviourSubjectsService,
              private router: Router, public dialog: MatDialog, private ss: SocketService, private utility: UtilityService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  collapseList(action: any, option: any): any {
    // console.log('check:', action, option);
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

  stopScreen(): void {
    this.stopScreenShareButtonStat = true;
    this.stopScreenShare.emit(true);
    this.screenShareStat.emit('Share Screen');
    this.ss.socket.emit('stopScreen', {uuid: this.param.id + '___' + this.param.id});
    if (this.screenshare) {
      // this.ss.socket.emit('leave', { uuid: `${this.param.id}___${this.param.id}`});
      this.publisherScreenShare.destroy('screen');
    }
    [this.screen, this.screenshare, this.screenShareId] = [undefined, undefined, undefined];
    this.bhvSub.obScreenShare(false);
  }

  Menu(val: any): void {
    // console.log('Menu Item :', val);
    this.bhvSub.obFullScreen(!val);
    this.fullScreen = !val;
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

  showSelectUser(id: any, addBorders: any): void {
    this.selectedUserID = id;
    this.selectStu = addBorders;
    /*const ind = this.studentsList.findIndex((m: any) => m.std_id === id);
    this.studentsList.unshift(this.studentsList.splice(ind, 1)[0]);
    this.studentContainer.nativeElement.scroll(0, 0);*/
  }

  ngOnChanges(sc: SimpleChanges): any {
    if (sc.selectUser && sc.selectUser.currentValue && this.studentsList) {
      const id = sc.selectUser.currentValue.std_id;
      if (this.studentsList.length > 1) {
        const ind = this.studentsList.findIndex((m: any) => m.std_id === id);
        this.studentsList.unshift(this.studentsList.splice(ind, 1)[0]);
        this.studentContainer.nativeElement.scroll(0, 0);
      }
    }
    if (sc.screenshare) {
      if (sc.screenshare.currentValue === false) {
        this.screen = undefined;
      }
    }
    if (sc.actionObj?.currentValue) {
      this.actionsHandler(sc?.actionObj?.currentValue?.name, sc?.actionObj?.currentValue?.value);
    }
    if (sc?.configMediaSettings?.currentValue !== undefined && sc?.configMediaSettings?.currentValue === true) {
      this.availableMediaDevices = mediaDev.availableDevices;
      this.configMediaoptions();
    }
  }

  actionsHandler(action: string, value: boolean): any {
    let actionObj: any = {
      'video': () => {
        this.pub.toggleVideo('webcam', value);
        this.publisherAvatar = value;
        this.studentsList[this.studentsList.findIndex(((obj: any) => obj.std_id === this.param.id))].video = value;
      },
      'audio': () => {
        this.pub.toggleAudio('webcam', value);
        this.userAudioIcon = value ? 'mic' : 'mic_off';
        this.studentsList[this.studentsList.findIndex(((obj: any) => obj.std_id === this.param.id))].audio = value;
      },
      'screen': () => {
        !value ? (
          this.publisherScreenShare = new PubUser(this.param.name + '(screen)', this.param.id + '___' + this.param.id, this.param.roomid, 'student', null, this.ss.socket, 'screen', null, '', true),
            this.publisherScreenShare.on('screen-share-denied', (err: Error, userID: string) => {
              this.ss.socket.emit('leave', {uuid: userID, type: 'webcam'});
            }),
            this.publisherScreenShare.sock = this.ss.socket,
            this.publisherScreenShare.connect()
        ) : (this.stopScreen());
      },
      'leave': () => {
        // if (confirm("Are you sure you want to leave ?")) {
        this.openDialog();
        // this.ss.socket.emit('leave', {uuid: this.param.id, type: 'webcam'});
        // this.pub.destroy();
        // this.stopScreen();
        // inSession = false;
        // mediaDev.stop();
        // this.router.navigate(['student/meeting-end'], {queryParamsHandling: 'merge'}).then((data) => {
        //   console.log('meeting end working', data);
        // }).catch((error: any) => {
        //   console.error(error);
        // });
        // } else {
        // }
      },
      'remove': () => {
        console.log(`Exit room called`)
      },
      'toggle-view': () => {
        this.Menu(value)
      },
      '': () => {
        console.log('Default')
      }
    };
    actionObj[action]() || actionObj['']();
  }

  // tslint:disable-next-line:typedef
  openDialog() {
    let dialogRef = this.dialog.open(DialogBoxComponent, { height: '25%', width: '25%'});

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        // this.moderatorLeave(true);
        this.ss.socket.emit('leave', {uuid: this.param.id, type: 'webcam'});
        this.pub.destroy();
        this.stopScreen();
        inSession = false;
        mediaDev.stop();
        this.router.navigate(['student/meeting-end'], {queryParamsHandling: 'merge'}).then((data) => {
          console.log('meeting end working', data);
        }).catch((error: any) => {
          console.error(error);
        });
      }
      dialogRef = null;
    });
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

  managePublisher(): any {
    console.warn('ManagerPublisher');
    mediaDev.on('media', () => {
      //console.warn('MediaDEv.On - media :', mediaDev.mediaStream);
      this.pub = myPubUser = new PubUser(this.param.name, this.param.id, this.param.roomid, 'student', null, this.ss.socket, 'webcam', mediaDev.mediaStream, 'NaN', true);
      //console.log('MyPubUSer : ', this.pub);
      this.pub.sendSpeakingInfo();
      this.pub.on('local', (type: string, stream: MediaStream) => {
        //console.log('Local USer MEdia Stream : ', stream);
        this.userStream = stream;
        this.Menu(false);
        this.userMediaEmit.emit(stream);
        this.subSession.start();
        this.studentsList[this.studentsList.findIndex(((obj: any) => obj.std_id === this.param.id))].msobj = stream;
      });

      this.pub.on('remote', async (type: string, media: MediaStream) => {
        this.audioview?.nativeElement ? (this.audioview.nativeElement.srcObject = await media) : (console.error('Audio Element not found'));
      });

      this.pub.on('toggleVideo', (e: any) => {
        this.studentsList[this.studentsList.findIndex(((obj: any) => obj.std_id === e.from))].video = e.status;
      });

      this.pub.on('toggleAudio', (e: any) => {
        this.audioStatus.emit(e);
        this.studentsList[this.studentsList.findIndex(((obj: any) => obj.std_id === e.from))].audio = e.status;
        if (!e.event) {
          this.userAudioIcon = e.status ? 'mic' : 'mic_off';
        }
      });

      this.pub.on('screen-share-denied', (e: any) => {
        // console.log(e);
      });
      this.pub.sock = this.ss.socket;
      this.pub.connect();
    });
    mediaDev.on('media-error', (error: any) => {
      console.log('media-error :', error);
      //this.utility.notify('We have encountered an issue with your camera. Please adjust your camera settings and try again.', 'Okay');
      this.router.navigate(['/student/login'], {queryParamsHandling: "merge"}).then().catch();
    });
    mediaDev.start();
  }


  socketEventListeners(event: any, data: any): any {
    let socketEvents: any = {
      'user-list': () => {
        const usersList = data.users.filter((std: any) => std?.uuid?.search(this.param.id) === -1);
        if (usersList.length > 0) {
          for (const std of data.users) {
            // tslint:disable-next-line:max-line-length
            const sub = new SubUser(std.name, Math.floor(Math.random() * 100000), std.roomid, 'dummy', std.serverIP, this.ss.socket, std.uuid);
            sub.on('remote', (user: object, type: string, stream: MediaStream) => {
              this.studentsList.map((student: any) => {
                if (student.std_id === std.uuid) {
                  student.msobj = stream;
                }
              });
              const ind = this.studentsList.findIndex((m: any) => m.proctor === 'teacher');
              this.studentsList.unshift(this.studentsList.splice(ind, 1)[0]);
              this.mediaStreamObj = stream;
            });
            sub.sock = this.ss.socket;
            sub.connect();
          }
        }
      },
      'face-data': () => {
        if (data) {
          this.studentsList = this.studentsList.map((std: any) => {
            std.engagement = Math.floor(data[std.std_id]?.engagement || 0);
            std.mood = Math.floor(data[std.std_id]?.mood_score || 0);
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
      'throw-chalk': () => {
        this.dialog.open(BottomSheetComponent);
      },
      'leave': () => {
        if (data?.userObj?.uuid === this.param.id) {
          Object.keys(this.pub).length !== 0 ? this.pub.destroy() : '';
          mediaDev.stop();
          this.ss.disconnectSocket();
          this.router.navigate(['student/meeting-end'], {queryParamsHandling: 'merge'});
        } else if (Object.keys(data?.userObj).length) {
          this.studentsList = this.studentsList.filter((user: any) => {
            return user.std_id !== data?.userObj?.uuid;
          });
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
      'limit': () => {
        this.utility.notify('The Room is already full. Please Connect with Moderator.', '');
        this.router.navigate(['auth']);
      },
      'screen-share': () => {
        this.utility.notify('Screen is already being shared by someone', '');
        [this.screen, this.screenshare, this.screenShareId] = [undefined, undefined, undefined];
        this.bhvSub.obScreenShare(false);
      },
      'room-audio': () => {
        // .log('Event room audio :' , data);
        this.audioStatus.emit({from: this.param.id, status: !data.mute});
        this.userAudioIcon = data.mute ? 'mic_off' : 'mic';
        this.studentsList = this.studentsList.map((el: any) => {
          el.audio = !data.mute;
          return el;
        });
        this.utility.notify(data.mute ? 'Room muted' : 'Room  un-muted', '');
      },
      '': () => {
      }
    };
    socketEvents[event.match(/^(user-list|face-data|throw-chalk|leave|limit|screen-share|room-audio)$/) ? event : '']() || socketEvents['']();
  }

  getSubscribedUsers(type: any, stream: any, sub: any, slot: any, mid: any, user: any): any {
    // console.warn('GetSubscribed Users :', user);
    if (type === 'audio' && stream !== null) {
      this.scShareAudio.nativeElement.srcObject = stream;
    }
    const exists = this.studentsList.find((r: any) => r.std_id === sub.uuid);
    if (!exists) {
      // tslint:disable-next-line:max-line-length
      this.studentsList.push({
        audio: user.janus.audio,
        engAvg: NaN,
        msobj: stream,
        screen: user.janus.screen,
        video: user.janus.video,
        webcam: user.janus.webcam,
        name: user.name,
        proctor: user.proctor,
        roomid: user.janus.room,
        serverIP: null,
        time: null,
        std_id: sub.uuid
      });
      this.utility.notify(user.name + ' Joined the call', '');
    } else {
      exists.msobj = stream;
    }

    this.studentsList.forEach((std: any, i: any) => {
      if (std.std_id.includes('___')) {
        this.studentsList = this.studentsList.filter((stu: any) => {
          return stu?.std_id?.indexOf('___') === -1;
        });
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
          this.utility.notify(user.name + 'Shared his/her screen', '');
          this.screenShareStat.emit((this.param.id + '___' + this.param.id) === sub.uuid ? {
            type: 'Self',
            Name: this.param.name
          } : {type: 'Other', Name: user.name});
        }, 1000);
        this.stopScreenShareButtonStat = false;
      }
    });
    // console.log('Students List(Updated) :', this.studentsList);
  }

  ngAfterViewInit(): void {
    // console.warn('NgAfterViewInit');
    this.route.queryParams.subscribe(next => {
      this.param = next;
      this.getUsers(next.roomid);
      setInterval(() => {
        this.studentID = next.id;
      }, 2000);
      this.ss.generateSocket();
      inSession = true;
      // this.subSession = new StateSubscription(`wss://${environment.serverName}.monetrewards.com:8989`, this.param.id, parseInt(this.param.room, 10), this.ss.socket);
      // this.subSession = new StateSubscription(`ws://localhost:8188/`, this.param.id, parseInt(this.param.room, 10), this.ss.socket);
      this.subSession = new StateSubscription(`wss://www.monetlive.com/${this.dynamicLink}/rtc/`, this.param.id, parseInt(this.param.room, 10), this.ss.socket);
      // console.log('State Subscription Object : ', this.subSession);
      this.managePublisher();
      this.ss.socket.onAny((eventName: any, data: any) => {
        this.socketEventListeners(eventName, data);
      });
    });
    // @ts-ignore
    this.subSession.on('remote', ({type, stream, slot, mid, sub, user}) => {
      setTimeout(() => {
        this.getSubscribedUsers(type, stream, sub, slot, mid, user);
      }, 3000);
    });

  }

  trackByUsers(index: number, users: any): any {
    return users.std_id;
  }

  ngOnInit(): void {
    // console.warn('NgOnInit');
    this.startTimer();
    this.bhvSub.fullScreen$.subscribe((data: any) => {
      // console.log('Behaviour Subject : ', data);
      if (data) {
        this.fullScreen = data;
        setTimeout(() => {
          const vid = document.getElementById(`webcamvideo`) as HTMLVideoElement;
          // const canvas = document.getElementById(`canvas`) as HTMLCanvasElement;
          [vid.width, vid.height, vid.muted, vid.autoplay, vid.srcObject] = [300, 300, false, true, this.userStream];
          // console.log('Stream Inside Behvaiur Subject : ', this.userStream);
          // init(vid, canvas);
        }, 500);
      }
    });
    this.bhvSub.screenShare$.subscribe((data: any) => {
      if (data !== '') {
        this.opacity = data;
      }
    });
    this.bhvSub.dynamicLink$.subscribe((link: any) => {
      this.dynamicLink = link;
    });
    this.bhvSub.faceData$.subscribe((state: boolean) => {
      // console.log('FaceDataFromBehaviourSubject-student side',state)
      this.faceDataState = state;
    });
  }

  getUsers(roomId: any): void {
    this.as.getApi('user_list?id=' + roomId).subscribe((success: any) => {
      if (success) {
        const self = success.response.filter((an: any) => an.std_id === this.param.id && !an.screen)[0];
        if (!self) {
          if (success.response) {
            // tslint:disable-next-line:max-line-length
            success.response.push({
              active: true,
              audio: true,
              name: this.param.name,
              proctor: 'student',
              roomid: this.param.roomid,
              screen: null,
              serverIP: '54.201.182.38',
              std_id: this.param.id,
              time: new Date(),
              video: true,
              webcam: true
            });
          }
        }
        if (success.response.length > 1) {
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
        this.studentsList = success.response.map((std: any) => {
          if (std.std_id === this.param.id) {
            std.active = true;
          }
        });
        this.studentsList = success.response.filter((std: any) => std.active !== false);
        this.studentEmit.emit(this.studentsList);
      }
    });
  }

  scrollList(pos: any): any {
    const el = document.getElementById('list') as HTMLDivElement;
    el.scrollTop = pos === 'top' ? el.scrollTop - 200 : el.scrollTop + 200;
  }

  ngOnDestroy(): void {
    this.pub = {};
    this.timer && clearInterval(this.timer);
    this.debounce && clearTimeout(this.debounce);
    mediaDev.stop();
  }

  tryAgain(): void {
    this.ss.socket.connect();
    this.router.navigate(['/student/dashboard'], {queryParamsHandling: "merge"});
    this.as.getApiStatic(`getRoomIp?roomid=${this.param.roomid}`).subscribe((ip: any) => {
      // console.log('GetRoomIP Response : ', ip);
      fetchAvailableInstance(ip.room.grp, ip.room.instance);
      // this.ss.generateSocket();
      this.bhvSub.obDynamicLink(ip.room.grp);
    });
  }
}

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<BottomSheetComponent>) {
  }

  close(event: MouseEvent): void {
    this.dialogRef.close();
    event.preventDefault();
  }
}
