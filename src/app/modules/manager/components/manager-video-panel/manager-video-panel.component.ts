import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SocketService} from '../../../shared/services/socket.service';
import {environment} from '../../../../../environments/environment';
import {BehaviourSubjectsService} from '../../../../services/behaviour-subjects.service';
import {UtilityService} from "../../../shared/services/utility.service";

declare var SubUser: any;
declare var StateSubscription: any;


@Component({
  selector: 'app-manager-video-panel',
  templateUrl: './manager-video-panel.component.html',
  styleUrls: ['./manager-video-panel.component.scss'],
  providers: [ApiService]
})
export class ManagerVideoPanelComponent implements  OnInit, AfterViewInit, OnChanges, OnDestroy  {

  @ViewChild('studentContainer') studentContainer: any;
  shouldLoad = false;
  dynamicLink: any;
  index: any = 0;
  subSession: any;
  studentsList: any;
  param: any;
  screen: any;
  screenShareId: any;
  conf: any;
  screenshare: any;
  json = JSON;
  size = {col: 5, row: 3};
  graphData = {};
  @Input() module: any;
  @Input() room: any;
  @Input() actions: any;
  @Input() selectUser: any;
  @Input() Link: any;
  @Output() studentEmit = new EventEmitter();
  constructor(private as: ApiService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog, private ss: SocketService, private bhvSub: BehaviourSubjectsService, private utility: UtilityService) {
  }

  intracted(): void {
    this.shouldLoad = true;
  }
  ngOnChanges(sc: SimpleChanges): any {
    if ((sc?.selectUser?.currentValue !== sc?.selectUser?.previousValue) && !sc?.selectUser?.firstChange) {
      const id = sc.selectUser.currentValue;
      this.router.navigate(['report/student-detail'], {queryParams: {roomid: id.roomid, student_id: id.std_id, module: 'manager'}});
    }
    if (sc?.Link) {
      // console.log('Dynamic Link assigned :', sc.Link.currentValue);
      this.dynamicLink = sc.Link.currentValue;
    }
  }

  getSubscribedUsers(type: any, stream: any, sub: any, slot: any, mid: any, user: any): any {
    const exists = this.studentsList.find((r: any) => r.std_id === sub.uuid);
    if (!exists) {
      // tslint:disable-next-line:max-line-length
      this.studentsList.push({audio: user.janus.audio, engAvg: NaN, msobj: stream, screen: user.janus.screen, video: user.janus.video, webcam: user.janus.webcam, name: user.name, proctor: user.proctor, roomid: user.janus.room, serverIP: null, time: null, std_id: sub.uuid});
    }
    else {
      exists.msobj = stream;
    }
    // @ts-ignore
    this.studentsList.forEach((std: any, i: any) => {
      if (std.std_id.includes('___')) {
        this.studentsList = this.studentsList.filter((stu: any) => {
          return stu?.std_id?.indexOf('___') === -1;
        });
        [this.screenshare, this.screen] = [true, 1];
        setTimeout(() => {
          const vid = document.getElementById(`screenShareStreem`) as HTMLVideoElement;
          vid.srcObject = std.msobj;
        }, 1000);
      }
    });
    console.error('Students List(Updated) :', this.studentsList);
  }

  ngAfterViewInit(): void {
    // console.log('Dyanmic link inside after view :', this.dynamicLink);
    this.route.queryParams.subscribe(next => {
      this.param = next;
      if (this.index++ === 0) {
        // console.warn('Called GetUsers ', this.index);
        this.getUsers(this.param.roomid);
      }
    });
    this.subSession = new StateSubscription(`wss://www.monetlive.com/${this.dynamicLink}/rtc/`, this.param.id, parseInt(this.room, 10), this.ss.socket);
    this.subSession.start();
    // @ts-ignore
    this.subSession.on('remote', ({type, stream, slot, mid, sub, user}) => {
    setTimeout(() => {
         this.getSubscribedUsers(type, stream, sub, slot, mid, user);
      }, 3000);
    });
    this.ss.socket.emit('add-manager', {roomid: this.param.roomid});
    this.subSession.start();
    this.ss.socket.on('face-data', ( data: any) => {
      this.graphData = data;
      if (data) {
        this.studentsList = this.studentsList.map((std: any) => {
          std.engagement = Math.floor(data[std.std_id]?.engagement || 0);
          std.mood = Math.floor(data[std.std_id]?.mood_score || 0);
          std.category_engagement = std.engagement > 80 ? 'High' : std.engagement > 40 ? 'Medium' : 'Low';
          std.category_mood = std.mood > 80 ? 'High' : std.mood > 40 ? 'Medium' : 'Low';

          return std;
        });
        this.studentEmit.emit(this.studentsList);
      }
    });

    this.ss.socket.on('leave', (e: any) => {
      // console.warn('leave event received :', e);
      if (Object.keys(e?.userObj).length) {
        this.studentsList = this.studentsList.filter( (user: any) => user?.std_id !== e?.userObj?.uuid);
        // console.log(this.studentsList);
        if (e.userObj.janus.screen === false && e.userObj.uuid.includes('___')) {
          [this.screen, this.screenshare, this.screenShareId] = [undefined, undefined, undefined];
        }
        this.studentEmit.emit(this.studentsList);
        // this.utility.notify(e.userObj.name + (e.userObj.janus.screen ? ' stopped sharing screen' : ' left the call'), '');
        this.utility.notify(e.userObj.name + (e?.userObj?.uuid.includes('___') ? ' stopped sharing screen' : ' left the call'), '');
      }
    });
  }
  trackByUsers(index: number, users: any): any {
    return users.std_id;
  }
  ngOnInit(): void {
    document.body.click();
    // this.ss.generateSocket();
   /* this.bhvSub.dynamicLink$.subscribe((link: any) => {
      this.dynamicLink = link;
    });*/
  }

  getUsers(roomId: any): void {
    this.as.getApi('user_list?id=' + roomId).subscribe((success: any) => {
      if (success) {
       success.response = success.response.filter((fl: any) => {
          if (fl.screen && fl.active) {
            this.screenshare = true;
          }
          if (fl.std_id !== this.param.id && !fl.screen && fl.active) {
            return fl;
          }
        });
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
       this.studentsList = success.response;
       if (!this.conf) {
        }
       this.studentEmit.emit(this.studentsList);
      }
    });
  }

  ngOnDestroy(): void {
    // console.log('manager Video panel destroyed');
  }
}
@Component({
  selector: 'app-bottom-sheet',
  templateUrl: 'bottom-sheet.html',
})
export class BottomSheetComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<BottomSheetComponent>) {}

  close(event: MouseEvent): void {
    this.dialogRef.close();
    event.preventDefault();
  }
}
