import {Component, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketService} from '../../../shared/services/socket.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfigureMediaComponent} from './configure-media/configure-media.component';
import {ScriptLoadService} from 'src/app/modules/shared/services/script-load.service';
import {ApiService} from '../../../shared/services/api.service';
import {UtilityService} from '../../../shared/services/utility.service';

declare var mediaDev: any;

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, AfterViewInit {

  @Output() startSession = new EventEmitter();

  recordingEnabled: any = false;
  recordMeeting: any = false;
  availableMediaDevices: any;
  OS: any;
  startMeet: any = true;
  action: any = true;
  vidElement: any;
  params: any;
  dialogOpener: any;
  permission: any = {audio: true, video: true, screen: false};
  video = {loadstart: true, buffering: false, canplay: false};
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

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private ss: SocketService, private router: Router, private dialog: MatDialog, private sl: ScriptLoadService, private as: ApiService, private utility: UtilityService) {
  }

  mainActions(action: any): void {
    switch (action.value) {
      case  'video': {
        this.permission.video = action.status;
        mediaDev.toggleVideo(action.status);
        this.ss.socket.emit('preview-toggle-video', {status: action.status});
        break;
      }
      case 'audio': {
        this.permission.audio = action.status;
        mediaDev.toggleAudio(action.status);
        this.ss.socket.emit('preview-toggle-audio', {status: action.status});
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

  ngOnInit(): void {
    this.ss.generateSocket();
    this.sl.load('janus').then((user: any) => {
      this.sl.load('user').then((janus: any) => {
        if (user[0].loaded && janus[0].loaded) {
          mediaDev.on('media', async (media: any) => {
            this.vidElement = document.getElementById(`video`) as HTMLVideoElement;
            if (this.vidElement) {
              [this.vidElement.srcObject, this.vidElement.muted] = [media, true];
            }
            this.availableMediaDevices = await mediaDev.availableDevices; 
          });
          mediaDev.on('media-error', (error: any) => {
            // console.log('Persmissions error :', error);
            //this.utility.notify('We have encountered an issue with your camera. Please adjust your camera settings and try again.', 'Okay');
            this.router.navigate(['/auth']);
          });
          mediaDev.start();
        }
      });
    });
    this.recordingEnabled = JSON.parse(localStorage.getItem('userPlanDetails') || '[]')?.recording;
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(next => {
      if (next) {
        this.params = next;
      }
    });
    this.OS = this.getOS();
  }

  getOS(): string | null {
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    let os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    }
    return os;
  }

  start(): void {
    setTimeout(() => {
      // tslint:disable-next-line:no-unused-expression
      this.recordMeeting ? this.recordCall() : '';
      this.startSession.emit(this.permission);
    }, 1000);
  }

  loadedMetaData(e: any): void {
    this.startMeet = false;
  }

  onLoadStart(e: any): any {
    if (e) {
      this.video.loadstart = false;
    }
  }

  // assignment(): any {
  //   this.router.navigate(['/teacher/test']);
  // }

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
        this.dialogOpener = null;
        if (next.result) {
          mediaDev.deltaMedia(next.result.label, next.result.id);
        }
      });
    }
  }

  recordCall(): any {
    this.ss.socket.emit('create-mosaic', {roomid: this.params.roomid, uuid: this.params.id});
    // this.as.postApi('create-mosaic', {roomid: this.params.roomid, uuid: this.params.id}).subscribe(
    //   (res: any) => {
    //     // console.log('Record Meeting Flag is ON now');
    //   },
    //   (err: any) => {
    //     console.error(err);
    //   });
  }

  stopStream(): void {
    mediaDev.stop();
  }
}
