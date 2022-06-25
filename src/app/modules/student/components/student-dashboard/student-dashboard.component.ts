import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptLoadService} from '../../../shared/services/script-load.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {SocketService} from '../../../shared/services/socket.service';
import {ApiService} from '../../../shared/services/api.service';
import {BehaviourSubjectsService} from '../../../../services/behaviour-subjects.service';

declare var PubUser: any;

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
  providers: [ScriptLoadService, DatePipe, ApiService]
})
export class StudentDashboardComponent implements OnInit, OnChanges {
  audioStatus: any;
  configMediaSettings: any = false;
  unfoldAction: any = false;
  checkSS: any = false;
  fullScreen: any = true;
  dispSideNav: any = true;
  loaded = false;
  // screenshare = false;
  selectUser = false;
  colsize = 6;
  flexValue = '243px';
  duration = {
    time: '00:00:00',
    duration: 0
  };
  studentID: any;
  date = new Date();
  students: any = [];
  msgCount: any = 0;
  actionObj = {name: '', value: false};
  video_spinner = {
    loadstart: true,
    buffering: false,
    canplay: false
  };
  actions = [
    {
      name: 'Mute',
      nameop: 'Unmute',
      value: 'audio',
      icon: 'mic',
      status: true,
      iconop: 'mic_off'
    },
    {
      name: 'Stop Camera',
      nameop: 'Share Camera',
      value: 'video',
      icon: 'videocam',
      status: true,
      iconop: 'videocam_off'
    },
    {
      name: 'Leave Room',
      value: 'leave',
      status: true,
      icon: 'call_end',
      iconop: 'call_end'
    },
    {
      name: 'Share screen',
      value: 'screen',
      nameop: 'Stop Sharing',
      // nameop: screenShareStat(),
      icon: 'screen_share',
      status: true,
      iconop: 'stop_screen_share'
    },
    {
      name: 'Put hand down',
      nameop: 'Raise hand',
      value: 'hand',
      icon: 'do_not_touch',
      status: false,
      iconop: 'pan_tool'
    },
    {
      name: 'Chat',
      value: 'chat',
      icon: 'speaker_notes_off',
      status: false,
      iconop: 'message'
    },

  ];
  param: any;
  room: any;
  messagePanel: any = false;

  constructor(private sl: ScriptLoadService,
              private route: ActivatedRoute, private datePipe: DatePipe, public ss: SocketService,
              private api: ApiService, private bhvSub: BehaviourSubjectsService) {
    this.route.queryParams.subscribe(m => {
      if (m) {
        this.param = m;
        this.getRoom(m.roomid);
      }
    });
  }
  onLoadStart(e: any): any {
    if (e) {
      this.video_spinner.loadstart = true;
    }
  }
  getRoom(roomid: any): void {
    this.api.getApi('getInviteRoom?roomid=' + roomid).subscribe(next => {
      if (next) {
        this.room = next.response;
      }
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(next => {
      if (next) {
        this.studentID = next.tid;
      }
    });
    if (this.duration.duration === 0) {
      setInterval( () => {
        this.duration.duration++;
        this.duration.time = this.datePipe.transform(this.duration.duration * 1000, 'H:mm:ss', 'UTC') || '';
      } , 1000);
    }

    this.bhvSub.screenShare$.subscribe( (data: any) => {
      if (data !== '') {
        console.warn('Response -> Bhvr Subject -> ScreenShare Val (Call Component) :', data);
        this.checkSS = this.fullScreen ? false : data;
        this.actions[3].status = !data;
        this.dispSideNav = data && !this.fullScreen ? !data : !(data && this.fullScreen) ? true : data;
      }
    });
    this.bhvSub.fullScreen$.subscribe( (data: any) => {
      console.warn('Full Screen BHV (call) :', data);
      if (data !== '' || data !== undefined) {
        this.fullScreen = data;
      }
    });
    this.sl.load('janus').then((user: any) => {
      this.sl.load('user').then((janus: any) => {
        if (user[0].loaded && janus[0].loaded) {
          this.loaded = true;
          console.log('MonetConference file loaded !');
        }
      });
    });
    const range = [
      {
        value: 30,
        cat: 'low'
      },
      {
        value: 50,
        cat: 'average'
      },
      {
        value: 70,
        cat: 'high'
      }
    ];
    this.students.map((m: any) => {
      range.map((n: any) => {
        if (m.value >= n.value){
          m.cat = n.cat;
        }
      });
      return m;
    });
  }

  getAudioStatus(e: any): void {
    // console.warn('audio  status event :', e);
    if ( e.from === this.param.id) {
      this.actions[0].status = e.status;
    }
  }

  getStudents(e: any): void {
    this.students = e;
    // console.warn('get students :', e);

    /* if (this.duration.duration === 0) {
       setInterval( () => {
         this.duration.duration++;
         // console.log(this.duration.duration, this.datePipe.transform(this.duration.duration, 'h:mm:ss'));
         this.duration.time = this.datePipe.transform(this.duration.duration * 1000, 'H:mm:ss', 'UTC') || '';
       } , 1000);
     }*/
  }

  getUserStream(e: any): any {
    // console.warn('User Stream Obj :', e);
    const vid = document.getElementById(`userVideo`) as HTMLVideoElement;
    [vid.width, vid.height, vid.muted, vid.autoplay, vid.srcObject] = [300, 300, false, true, e];
  }

  shareScreen(roomId: any, action: any): void {
    // console.log(this.screenshare, roomId);
  }

  mainActions(action: any): void {
    [this.actionObj.name, this.actionObj.value] = [action.value, action.status];
    switch (action.value) {
      case 'screen': {
        this.actionObj = Object.assign({}, this.actionObj);
        this.bhvSub.obScreenShare(true);
        break;
      }
      case 'video': {
        console.warn('Action triggered :', action.value, action.status);
        this.actionObj = Object.assign({}, this.actionObj);
        break;
      }
      case 'audio': {
        this.actionObj = Object.assign({}, this.actionObj);
        break;
      }
      case 'hand': {
        this.ss.socket.emit('raise-hand', {from: this.param.id, status: action.status});
        break;
      }
      case 'leave': {
        console.warn('Leave -> student dashboard', action.value, action.status);
        this.actionObj = Object.assign({}, this.actionObj);
        break;
      }
      case 'chat': {
        this.check(action.status);
        break;
      }
      default: {
        console.log('Unknown');
        break;
      }
    }
  }

  toggleView(val: any): any {
    [this.actionObj.name, this.actionObj.value] = ['toggle-view', val];
    this.actionObj = Object.assign({}, this.actionObj);
  }

  colsizeChange(size: any): void {
    console.log(size);
    this.colsize = size.wide;
  }

  setSideNavSize(size: any): void {
    this.flexValue = size;
  }

  check(e: any): void {
    this.messagePanel = e;
    console.log(this.messagePanel);
  }
  receivedMessageEvent(e: any): void {
    this.actions[5].status = e;
  }

  ngOnChanges(sc: SimpleChanges): void {
    console.warn(sc);
    if (sc?.audioStatus) {
      console.warn('Sc audio stats :', sc.audioStatus.currentValue);
    }
  }

  getScreenShare(e: any): any {
    console.warn('ScreenShare Stream Object :', e);
    setTimeout(() => {
      const vidElement = document.getElementById(`screenShareVideo`) as HTMLVideoElement;
      if (vidElement) {
        [vidElement.width, vidElement.height, vidElement.muted, vidElement.autoplay, vidElement.srcObject] = [300, 300, false, true, e];
      }
    }, 1000);
  }

  SidePanel(): void {
    let count = 0;
    console.log(`collapse side-panel : ${this.unfoldAction}`);
    let sideNavWidth = this.unfoldAction ? 18 : 0;
    let videoStreamsLeft = this.unfoldAction ? 18 : 0;
    let videoStreamWidth = this.unfoldAction ? 82 : 100;
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
    }
    else {
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
    if (typeof(e) === "object") {
      this.actions[3].nameop = e.type === 'Self' ? 'You are sharing your screen' : `Screen is being Shared by ${e.Name}`;
    }
    else{
      this.actions[3].nameop = e;
    }
  }

}
