import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../modules/shared/services/api.service';
import {SocketService} from '../../modules/shared/services/socket.service';
import { BehaviourSubjectsService } from 'src/app/services/behaviour-subjects.service';

declare var cf: any;
declare var MediaStreams: any;


@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss'],
  providers: [ApiService]
})
export class VideoStreamComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('videoview') videoview: any;
  student: any;
  params: any;
  setInterval: any;
  engOrMood: any;
  @Input() set std(val: any) {
    this.student = JSON.parse(val);
    // console.log('student list parsed :', this.student);
  }

  @Input() module: any;
  @Input() selectUser: any;
  @Input() action: any;
  @Input() mediaStreamObj: any;
  studentID: any;
  randomColor = [0, 0, 0];
  video = {
    loadstart: true,
    buffering: false,
    canplay: false
  };
  buffer = new Subject();
  time = new Subject();
  @Output() actionEmitter = new EventEmitter();
  // @Output() audioLevel = new EventEmitter();
  actions = [
    {
      name: 'Throw chalk',
      icon: 'throwChalk',
      enable: true,
      value: 'throwChalk',
      action: function action(): void {
      }
    },
    {
      name: 'Mute',
      icon: 'mic',
      value: 'mic',
      enable: true,
      action: function action(stdID: any): void {
        this.enable = !this.enable;
        this.icon = this.enable ? 'mic' : 'mic_off';
        this.name = this.enable ? 'Mute' : 'Unmute';
        console.log('togle Mute :', this.enable);
        // this.muteButtonColor = this.enable;
      }
    },
    {
      name: 'Remove',
      icon: 'exit_to_app',
      value: 'exit',
      enable: true,
      action: function action(): void {
        console.log(this.name);
      }
    }
  ];

  constructor(private route: ActivatedRoute, private api: ApiService, private ss: SocketService, private bhvSub: BehaviourSubjectsService,) {
    this.randomColor = this.generateRandomColor();
  }

  getCssClass() {                                                          //function is added to show engagement and mood indicator dynamically
    this.bhvSub.engOrMood$.subscribe((data: any): any => {
      this.engOrMood = data;
    });
    if(this.engOrMood === 0){
      return <string>this.student.category_engagement;
    }else{
      return <string>this.student.category_mood;
    }
  }
  
  generateRandomColor(): any {
    const arr = [0, 0, 0];
    return arr.map(m => Math.floor(Math.random() * 128));
  }

  ngAfterViewInit(): void {
    // let UserMediaStream = [];
    this.videoview.nativeElement.srcObject = this.mediaStreamObj;
    this.videoview.nativeElement.play();
    // this.ensureVideoPlays();
  }

  ngOnChanges(sc: SimpleChanges): void {
    // if (sc.mediaStreamObj && this.videoview && this.audioview) {
    if (sc.mediaStreamObj && this.videoview) {
      if (sc.mediaStreamObj && this.studentID === this.student.std_id) {
        this.videoview.nativeElement.muted = true;
      }
      this.videoview.nativeElement.srcObject = this.mediaStreamObj;
      this.videoview.nativeElement.play();
      // this.ensureVideoPlays();
    }
  }

  /*   ensureVideoPlays(): void {
      const video =  this.videoview.nativeElement;
      if (!video) return;
      const promise = video.play();
      if (promise !== undefined) {
        promise.then(() => {
          // Autoplay started
        }).catch((error: any) => {
          // Autoplay was prevented.
          video.muted = true;
          video.play();
        });
      }
    }*/

  ngOnInit(): void {
    this.route.queryParams.subscribe(next => {
      if (next) {
        this.params = next;
        this.studentID = next.id;
      }
    });
    this.buffer.pipe(debounceTime(3000)).subscribe(next => {
      if (next) {
        this.video.buffering = true;
      }
    });
    // this.ensureVideoPlays();
  }

  videoProgress(e: any): any {
    this.buffer.next(e);
  }

  onLoadStart(e: any): any {
    if (e) {
      this.video.loadstart = true;
    }
  }

  canPlay(e: any): void {
    this.video.canplay = true;
    this.video.loadstart = false;
  }

  playVideo(e: any): void {
    // console.log(e);
  }

  playingVideo(e: any): void {
    if (e) {
      this.video.buffering = false;
    }
  }

  paused(e: any): void {
    // console.log(e);
  }

  waiting(e: any): void {
    /*console.log(e);*/
  }

  error(e: any): void {
    /* console.log(e);*/
  }

  canplaythrough(e: any): void {
    this.video.loadstart = false;
  }

  timeupdate(e: any): void {
    /*this.time.next(e.timeStamp);*/
    /*console.log(e);*/
  }

  loadedMetaData(e: any): void {
    // console.log('loaded :', e);
    // this.soundVisualizer(canvasid);
    // this.vuMeter();
  }

  abort(event: any): void {
    // console.log('Abort Event :', event);
  }
}
