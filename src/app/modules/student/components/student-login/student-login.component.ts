import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { ScriptLoadService } from '../../../shared/services/script-load.service';
import { SocketService } from '../../../shared/services/socket.service';
import { Subscription } from 'rxjs';
import { UtilityService } from '../../../shared/services/utility.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviourSubjectsService } from '../../../../services/behaviour-subjects.service';
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";
import { DatePipe } from '@angular/common';
import { AssignmentComponent } from "../assignment/assignment.component";
import { MatDialog } from "@angular/material/dialog";

declare function fetchAvailableInstance(link: string, ip: string): any;

declare var mediaDev: any;
declare var studentStream: any;

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss'],
  providers: [ApiService, ScriptLoadService, SocketService]
})
export class StudentLoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('studentStream') studentStream: any;
  @ViewChild('myCanvas') myCanvas: any;
  public context: CanvasRenderingContext2D;
  scheduled: boolean = undefined;
  studentLoginForm: FormGroup;
  case = 0;
  spinnerMode: ProgressSpinnerMode = 'determinate';
  userList: any;
  permission = false;
  rejected = false;
  serverGrp: string | undefined;
  serverIp: string | undefined;
  urlParams: Params;
  assignmentData: any;
  action: any = true;
  queryParamsSubscription: Subscription;
  availableMediaDevices: any;
  id: any = this.utility.create_UUID().replaceAll('-', '');
  permissions: any = { audio: true, video: true, screen: false };
  video = { loadstart: true, buffering: false, canplay: false };
  startMeet: any = true;
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
      value: 'video',
      icon: 'videocam',
      nameop: 'Share Camera',
      status: true,
      iconop: 'videocam_off'
    },
  ];


  constructor(private sl: ScriptLoadService,
    private changeDetectorRef: ChangeDetectorRef,
    private bhvSub: BehaviourSubjectsService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private socketService: SocketService,
    private utility: UtilityService,
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private router: Router) {
    localStorage.setItem('student_uuid', this.id);
  }

  ngAfterViewInit(): void {
    // this.context = this.myCanvas.nativeElement.getContext('2d');
  }

  // This is angular lifecycle hook method
  ngOnInit(): void {
    this.studentLoginForm = this.formBuilder.group({
      name: ['', Validators.required],
      roomid: ['', Validators.required],
      room: ['', Validators.required],
      id: ['', Validators.required]
    });

    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.urlParams = params;

      this.studentLoginForm.setValue({ name: '', roomid: this.urlParams.room, room: this.urlParams.room, id: this.id });
    }, (error: any) => {
      console.error(error)
    }, () => {
      console.log('completed');
    });

    this.sl.load('janus').then(() => {
      this.sl.load('user').then(() => {
        this.getRoomIp(this.urlParams.roomid);
      });
    });

    this.interval = setInterval(() => {
      this.getRoomIp(this.urlParams.roomid);
    }, 3000);
  }

  // This is angular lifecycle hook method
  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
    mediaDev.stop();
  }

  interval: any;

  // This function will provide server details for the student to join the call
  getRoomIp(roomId: any): void {
    this.apiService.getApiStatic('getRoomIp?roomid=' + roomId).subscribe((result: any) => {
      if (!result.error) {
        this.scheduled = result.room.scheduled;
        if (result.room.grp === '' && result.room.instance === '') {
          this.case = 3;
          return
        }
        if (result.room.grp !== undefined && result.room.instance !== undefined) {
          clearInterval(this.interval);
          this.serverGrp = result.room.grp;
          this.serverIp = result.room.instance;
          this.bhvSub.obDynamicLink(result.room.grp);
          fetchAvailableInstance(this.serverGrp, this.serverIp);
          this.socketService.generateSocket();
          this.socketService.socket.on('join-response', (data: any) => {
            if (data.confirmed === false) {
              this.zone.run(() => {
                this.router.navigate(['student/rejected'], { queryParams: this.studentLoginForm.value }).then().catch();
                return
              });
            }
            if (data.confirmed) {
              this.zone.run(() => {
                this.router.navigate(['student/dashboard'], { queryParams: this.studentLoginForm.value }).then().catch();
              });
            }
          });
          this.socketService.socket.on('call-not-started', (data: any) => {
            this.case = 3;
          });
          this.socketService.socket.on('meeting-initiated', (data: any) => {
            this.case = 2;
            this.socketService.socket.emit('join-request', {
              roomid: this.studentLoginForm.value.roomid,
              uuid: this.studentLoginForm.value.id,
              name: this.studentLoginForm.value.name
            });
            this.router.navigate(['student/waiting-room'], { queryParamsHandling: 'merge' }).then().catch();
          });
          this.socketService.socket.on('assignment-broadcast', (data: any) => {
            this.assignmentData = data;
            localStorage.setItem('assignment', JSON.stringify(data));
            this.openDialogBox();
          });
          mediaDev.on('media', async (media: any) => {
            studentStream = media;
            this.case = 2;
            this.changeDetectorRef.detectChanges();
            const vid = document.getElementById('studentStream') as HTMLVideoElement;
            console.log('Native Canvas Element', this.myCanvas.nativeElement);
            this.context = this.myCanvas.nativeElement.getContext('2d');
            //this.vuMeter(this.context);
            if (vid) {
              vid.srcObject = media;
            }
          });
          mediaDev.on('media-error', (error: any) => {
            console.error('media-error', error);
            this.case = 1;
          });
          mediaDev.start();
        }
      }
    });
  }

  loadedMetaData(e: any): void {
    this.startMeet = false;
  }

  onLoadStart(e: any): any {
    if (e) {
      this.video.loadstart = false;
    }
  }

  openDialogBox(): void {
    const dialogBox = this.dialog.open(AssignmentComponent, { disableClose: true, width: 'auto', height: 'auto', data: this.assignmentData });
    dialogBox.afterClosed().subscribe((data: any) => {
    });
  }
  // This function will emit an event on socket so that student enter into the waiting list in the teacher side
  askToJoin(): void {
    if (this.studentLoginForm.status === 'VALID') {
      this.getUser(this.studentLoginForm.value.roomid);
      this.socketService.socket.emit('join-request', {
        roomid: this.studentLoginForm.value.roomid,
        uuid: this.studentLoginForm.value.id,
        name: this.studentLoginForm.value.name
      });
      this.router.navigate(['student/waiting-room'], {queryParamsHandling: 'merge'}).then().catch();
      if (!this.scheduled) {
        // this.router.navigate(['student/waiting-room'], {queryParamsHandling: 'merge'}).then().catch();
      }
    } else {
      return;
    }
  }

  getUser(roomId: any): void {
    this.apiService.getApi('user_list?id=' + roomId).subscribe(async (success: any) => {
      if (success && success.response && success.response.length > 0) {
        this.userList = success.response;
      }
    });
  }

  checkRoom(): void {
    this.getRoomIp(this.urlParams.roomid);
  }

  mainActions(action: any): void {
    switch (action.value) {
      case 'video': {
        this.permissions.video = action.status;
        mediaDev.toggleVideo(action.status);
        this.socketService.socket.emit('preview-toggle-video', { status: action.status });
        break;
      }
      case 'audio': {
        this.permissions.audio = action.status;
        mediaDev.toggleAudio(action.status);
        this.socketService.socket.emit('preview-toggle-audio', { status: action.status });
        break;
      }
      case 'screen': {
        break;
      }
      default: {
        break;
      }
    }
  }

  date: any;

}
