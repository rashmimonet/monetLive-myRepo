import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../shared/services/api.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ScriptLoadService} from '../../../shared/services/script-load.service';
import {DatePipe} from '@angular/common';
import {SocketService} from '../../../shared/services/socket.service';
import {BehaviourSubjectsService} from '../../../../services/behaviour-subjects.service';
import {UtilityService} from '../../../shared/services/utility.service';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
  providers: [ApiService, ScriptLoadService, DatePipe]
})
export class CallComponent implements OnInit, OnDestroy {
  @ViewChild('video') video: any;
  interval: any;
  configurations: any;
  configMediaSettings: any;
  unfoldAction: any = false;
  checkSS: any = false;
  pub: any;
  moderatorObj: any = {
    instance: '',
    stream: ''
  };
  fullScreen: any = false;
  dispSideNav: any = true;
  studentFilter: FormGroup;
  date = new Date();
  link: any;
  loaded = false;
  scoreVal: any = 1;
  dispFilterBottom = false;
  scores = [{name: 'Session', value: 0}, {name: '10 Seconds', value: 10}, {name: 'Actual', value: 1}];
  muteAll = {
    name: 'Mute All',
    nameop: 'Unmute All',
    value: 'muteall',
    icon: 'mic',
    status: false,
    iconop: 'mic_off'
  };
  permission: FormGroup;
  students: any = [];
  stream = {};
  param: any;
  session: any = false;
  room: any;
  msgCount: any = 0;
  teacherID: any;
  flexValue: any = '243px';
  video_spinner = {
    loadstart: true,
    buffering: false,
    canplay: false
  };
  duration = {
    time: '00:00:00',
    duration: 0
  };
  actionObj = {name: '', value: false};
  actions = [
    {
      name: 'Mute',
      nameop: 'Unmute',
      value: 'audio',
      icon: 'mic',
      status: false,
      iconop: 'mic_off'
    },
    {
      name: 'Stop Camera',
      value: 'video',
      icon: 'videocam',
      nameop: 'Share Camera',
      status: false,
      iconop: 'videocam_off'
    },
    {
      name: 'Leave Room',
      value: 'leave',
      status: false,
      icon: 'call_end',
      iconop: 'call_end'
    },
    {
      name: 'Stop Sharing',
      value: 'screen',
      nameop: 'Share Screen',
      icon: 'stop_screen_share',
      status: false,
      iconop: 'screen_share',
    },
    {
      name: 'Chat',
      value: 'chat',
      icon: 'speaker_notes_off',
      status: false,
      iconop: 'message',
    }
  ];
  messagePanel: any = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, public api: ApiService, private dialog: MatDialog, private sl: ScriptLoadService, private router: Router, private httpClient: HttpClient, private datePipe: DatePipe, public ss: SocketService, private bhvSub: BehaviourSubjectsService, private utility: UtilityService, private _snackBar: MatSnackBar) {
    this.studentFilter = this.fb.group({
      duration: ['1']
    });

    this.permission = this.fb.group({
      audio: [true],
      video: [true],
      screen: [false]
    });
  }

  getRoom(roomid: any): void {
    this.api.getApi('getInviteRoom?roomid=' + roomid).subscribe(next => {
      if (next) {
        this.room = next.response;
      }
    });
  }

  muteAllParticipants(e: any): any {
    console.log(e);
    this.muteAll.status = !this.muteAll.status;
    [this.actionObj.name, this.actionObj.value] = ['muteRoom', this.muteAll.status];
    this.actionObj = Object.assign({}, this.actionObj);
    this.actions[0].status = !this.muteAll.status;
  }

  fileName: string;

  assigmentList: Array<any> = []

  uploadAssignment(event: any): void {
      for(let i = 0; i < event.target.files.length; i++) {
        const file: File = event.target.files[i];
        const formData = new FormData();
        formData.append('files', file);
        this.api.postApi(`createAssignment?roomId=${this.roomId}`, formData).subscribe((result: any) => {
          if (!result.error) {
            this.assigmentList.push({fileName: file.name, title: result.assignment.title, fileId: result.assignment._id});
          }
        });
      }
    this._snackBar.open(`Assignment uploaded`, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
    console.log('Assignment list', this.assigmentList);
  }

  roomId: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(next => {
      if (next) {
        this.param = next;
        this.teacherID = next.id;
        this.roomId = next.roomid;
        this.getRoom(next.roomid);
        this.getUsers(next.roomid);
        this.link = window.location.href.split('#')[0] + '#/' + 'student/login?roomid=' + this.param.roomid + '&room=' + this.param.room;
        this.ss.generateSocket();
        this.sl.load('janus').then((user: any) => {
          this.sl.load('user').then((janus: any) => {
            if (user[0].loaded && janus[0].loaded) {
              this.loaded = true;
            }
          });
        });
      }
    });
    this.bhvSub.screenShare$.subscribe((data: any) => {
      if (data !== '') {
        this.checkSS = data;
        this.actions[3].status = data;
        this.dispSideNav = data && !this.fullScreen ? !data : !(data && this.fullScreen) ? true : data;
      }
    });
    this.bhvSub.fullScreen$.subscribe((data: any) => {
      if (data !== '') {
        this.fullScreen = data ? data : false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.students) {
      localStorage.setItem('students', JSON.stringify(this.students));
      localStorage.setItem('callDetails', JSON.stringify(this.duration));
    }
    clearInterval(this.interval);
  }

  getUsers(roomId: any): void {
    this.api.getApi('user_list?id=' + roomId);
  }

  mainActions(action: any): void {
    [this.actionObj.name, this.actionObj.value] = [action.value, action.status];
    // console.log('ACTION OBJECT :', this.actionObj);
    switch (action.value) {
      case 'screen': {
        this.actionObj = Object.assign({}, this.actionObj);
        this.bhvSub.obScreenShare(true);
        break;
      }
      case  'video': {
        this.actionObj = Object.assign({}, this.actionObj);
        break;
      }
      case 'audio': {
        this.actionObj = Object.assign({}, this.actionObj);
        break;
      }
      case 'leave': {
        this.actionObj = Object.assign({}, this.actionObj);
        break;
      }
      case 'chat': {
        this.check(action.status);
        break;
      }
      case 'settings': {
        this.actionObj = Object.assign({}, this.actionObj);
        break;
      }
      default: {
        break;
      }
    }
  }

  toggleView(val: any): any {
    // debugger
    [this.actionObj.name, this.actionObj.value] = ['toggle-view', val];
    this.actionObj = Object.assign({}, this.actionObj);
  }

  shareScreen(e: any): void {
    console.log(e);
  }

  getStudents(e: any): void {
    this.students = e;
  }

  startSession(value: any): void {
    this.configurations = value;
    this.actions.map(m => {
      if (value.hasOwnProperty(m.value)) {
        m.status = value[m.value];
      }
    });
    if (value.screen) {
      this.shareScreen(this.param);
    }
    if (this.duration.duration === 0) {
      const meetingDuration = JSON.parse(localStorage.getItem('userPlanDetails') || '[]').meetingDuration;
      this.interval = setInterval(() => {
        this.duration.duration++;
        this.duration.time = this.datePipe.transform(this.duration.duration * 1000, 'H:mm:ss', 'UTC') || '';
        if ((this.duration.duration < meetingDuration * 60) && (this.duration.duration === (meetingDuration * 60 - 300))) {
          this.utility.notifyPermanent('Your Meeting is going to expire in 5 minutes.', 'Okay');
        } else if (this.duration.duration === (meetingDuration * 60)) {
          this.utility.notify('Call Ended. Duration limit reached !', '');
          this.actionObj = Object.assign('', {name: 'endRoom', value: true});
        }
      }, 1000);
    }
    this.session = true;
    setTimeout(() => this.dispFilterBottom = true);
  }

  check(val: any): void {
    this.messagePanel = val;
  }

  receivedMessageEvent(e: any): void {
    this.actions[4].status = e;
  }

  getModeratorStream(e: any): any {
    const vid = document.getElementById('moderatorvideo') as HTMLVideoElement;
    if (vid) {
      this.moderatorObj.stream = e;
      [vid.width, vid.height, vid.muted, vid.autoplay, vid.srcObject] = [300, 300, true, true, e];
    }
  }

  getScreenShare(e: any): any {
    setTimeout(() => {
      const vidElement = document.getElementById(`screenShareVideo`) as HTMLVideoElement;
      if (vidElement) {
        [vidElement.width, vidElement.height, vidElement.muted, vidElement.autoplay, vidElement.srcObject] = [300, 300, false, true, e];
      }
    }, 1000);
  }

  onLoadStart(e: any): any {
    if (e) {
      this.video_spinner.loadstart = true;
    }
  }

  SidePanel(): void {
    let count = 0;
    let sideNavWidth = this.unfoldAction ? 18 : 0;
    let videoStreamsLeft = this.unfoldAction ? 18 : 0;
    const videoStreamWidth = this.unfoldAction ? 82 : 100;
    const sideNav = document.getElementById('sideNav') as HTMLDivElement;
    const videoStreams = document.getElementById('video_streams') as HTMLDivElement;
    if (this.unfoldAction) {
      const timerColl = setInterval(() => {
        sideNav.style.width = `${sideNavWidth--}vw`;
        videoStreams.style.left = `${videoStreamsLeft--}vw`;
        videoStreams.style.width = `${videoStreamWidth + count++}vw`;
        if (sideNavWidth < 0) {
          clearInterval(timerColl);
        }
      }, 1);
    } else {
      const timerColl = setInterval(() => {
        sideNav.style.width = `${sideNavWidth++}vw`;
        videoStreams.style.left = `${videoStreamsLeft++}vw`;
        videoStreams.style.width = `${videoStreamWidth - count++}vw`;
        if (sideNavWidth > 18) {
          clearInterval(timerColl);
        }
      }, 1);
    }
  }

  getStat(e: any): any {
    if (typeof (e) === 'object') {
      this.actions[3].nameop = e.type === 'Self' ? 'You are sharing your screen' : `Screen is being Shared by ${e.Name}`;
    } else {
      this.actions[3].nameop = e;
    }
  }

  btnDisabled = (action: any) => {
    if (action.value === 'chat') {
      return JSON.parse(String(localStorage.getItem('chat')));
    }
  }

  // This method will publish the assignment which you have selected from the list
  publishAssignment(event: any): void {
    // This line will emit the publish assignment on socket so that other students will get assignment on their screen
    this.ss.socket.emit('publish-assignment', {id: event.target.id, roomId: this.roomId});
    // Remove the assignment which you just published from the list so that it will be removed from the assignment list
    this.assigmentList = this.assigmentList.filter((item: any) => {
      return item.fileId !== event.target.id;
    });
  }

}

@Component({
  selector: 'app-invite-student',
  templateUrl: './invite-student.component.html',
  styleUrls: ['./call.component.scss']
})
export class InviteStudentComponent {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public dialogref: MatDialogRef<InviteStudentComponent>) {
    this.form = this.fb.group({
      name: [''],
      roomid: [data.roomid],
      email: ['', Validators.required],
      subject: [''],
      startdate: [''],
      stopdate: [''],
      joinLink: [data.link],
      content: ['', Validators.required]
    });
  }

}
