// /* tslint:disable:max-line-length */
// import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { SocketService } from 'src/app/modules/shared/services/socket.service';
// import {HttpClient, HttpErrorResponse} from '@angular/common/http';
// import { ApiService } from 'src/app/modules/shared/services/api.service';
// import {ScriptLoadService} from '../../../shared/services/script-load.service';
// import {Observable, forkJoin, throwError, of} from 'rxjs';
// import {environment} from '../../../../../environments/environment';
// import {StudentDetailService} from '../../../shared/services/student-detail.service';
// import {UtilityService} from "../../../shared/services/utility.service";
// import {number} from "@amcharts/amcharts4/core";
// declare var MediaStreams: any;
//
// @Component({
//   selector: 'app-student-detail',
//   templateUrl: './student-detail.component.html',
//   styleUrls: ['./student-detail.component.scss'],
//   providers: [StudentDetailService]
// })
// export class StudentDetailComponent implements OnInit, AfterViewInit {
//   @ViewChild('video') video: any;
//   @ViewChild('videoScreenAudiio') videoScreenAudiio: any;
//   @ViewChild('screen') screen: any;
//   scoresTimeGap: number = +(localStorage.getItem('RealTimeScore') || '');
//   screenShareSeek = {
//     start: number,
//     end: number
//   }
//   noop: any;
//   allSeriesData: any;
//   base = environment.base;
//   videoTimeCounter: any = 0;
//   pauseVideoAt: any = 0;
//   time: any = '00:00:00';
//   detectChartDataChange: any;
//   liveStreamVideo: any = false;
//   params: any;
//   check: any;
//   dataRaw: any;
//   dispChartType = true;
//   disableToggle = false;
//   config: any = {
//     chart: undefined,
//     minuteToggle: false,
//     video: undefined,
//     dataRaw: undefined
//   };
//
//   constructor(private route: ActivatedRoute,
//               private ss: SocketService,
//               private http: HttpClient,
//               private as$: ApiService,
//               private sl: ScriptLoadService,
//               private sds: StudentDetailService,
//               private utility: UtilityService) {
//     this.noop = () => {};
//   }
//
//   getData(params: any): void {
//     const overAllSessiondata = of(JSON.parse(localStorage.getItem('reportData') || '{}').overallEngagement);
//     const userSessionData = this.as$.getApiStatic('report' + '?id=' + params.student_id);
//     const userScreenShareData = this.as$.getApiStatic('getScreenShareDetails' + '?uuid=' + params.student_id);
//     forkJoin([overAllSessiondata, userSessionData, userScreenShareData])
//       .subscribe((results: any) => {
//       if (results[1].response?.session_data) {
//         results[1].response.session_data = results[1].response.session_data.sort((a: any, b: any) => a.segment - b.segment);
//         this.dataRaw = results[1].response;
//         this.disableToggle = this.utility.calculateDuration([results[1].response]).duration < 60;
//         results[1].response?.session_data?.map((element: any) => {
//           element.engagement = element.engagement === null ? 0 : element.engagement;
//           element.mood = element.mood === null ? 0 : element.mood;
//           element.category = this.utility.setCategory(element.engagement);
//           element.moodCategory = this.utility.setCategory(element.mood);
//           return element;
//         });
//       }
//       this.allSeriesData = this.sds.getCompiledData(results[0], results[1].response.session_data, results[2].data?.janus);
//       console.log('All Series Data :', this.allSeriesData);
//       setTimeout(() => {
//         if (this.screen !== undefined) {
//           this.configureScreenShare(this.screen.nativeElement);
//         }
//       }, 1000);
//     },
//     error => {
//       console.error(error);
//     });
//   }
//
//   ngOnInit(): void {
//     this.route.queryParams.subscribe(next => {
//       if (next && next.student_id) {
//         this.params = next;
//         if (this.params?.module !== 'manager') {
//           this.getData(next);
//         }
//         else {
//           this.dispChartType = false;
//           let UserMediaStream: any = {};
//           this.getData(this.params);
//           // this.ss.generateSocket();
//           this.sl.load('janus').then((user: any) => {
//             this.sl.load('user').then((janus: any) => {
//               if (user[0].loaded && janus[0].loaded) {
//                 UserMediaStream = MediaStreams.filter((el: any) => {
//                   if (el.id === this.params.student_id && el.type === 'video')  {
//                     this.liveStreamVideo = true;
//                     return el;
//                   }
//                 });
//                 setTimeout(() => {
//                   const vidElement = document.getElementById('video') as HTMLVideoElement;
//                   if (vidElement) {
//                     vidElement.srcObject = UserMediaStream[0].stream;
//                     vidElement.play();
//                   }
//                   else {
//                     // console.warn('Video Element not found');
//                   }
//                 }, 3000);
//                /* this.ss.socket.on('face-data', (data: any) => {
//                   if (data && this.params.student_id) {
//                     const studentDataLive = {
//                       NumberOfFaces: data[this.params.student_id].NumberOfFaces,
//                       engagement: data[this.params.student_id].engagement,
//                       mood: data[this.params.student_id].mood_score,
//                       segment: data[this.params.student_id].segment,
//                       createdAt: data[this.params.student_id].createdAt,
//                       category: this.utility.setCategory(data[this.params.student_id].engagement),
//                       moodCategory: this.utility.setCategory(data[this.params.student_id].mood_score)
//                     };
//                     this.check = studentDataLive;
//                   }
//                 });*/
//               }
//             });
//           });
//         }
//       }
//       setTimeout(() => {
//         this.detectChartDataChange = false;
//       }, 2000);
//     });
//   }
//
//   ngAfterViewInit(): void {
//     // this.ss.generateSocket();
//   }
//
//   videoTimeUpdate(e: any, videoPauseState: boolean, triggerFromScreenShare: boolean = false): void { // move chart cursor
//     // console.log('Check State :', this.screen, !videoPauseState);
//     if (this.screen !== undefined && !videoPauseState) {
//       console.log('Inside IF');
//     // if (triggerFromScreenShare) {
//       this.seekScreenShareVideoFrom(Math.floor(e.target.currentTime));
//     }
//     else {
//       // console.warn('Screen Share element not found. ', this.screen);
//     }
//     const Video: any = document.getElementById('video');
//     if (this.config?.chart?.data[this.config?.chart?.data?.length - 1].segment >= Math.floor(e.target.currentTime)) {
//       if (this.pauseVideoAt !== 0 && this.videoTimeCounter + Math.floor(e.target.currentTime / this.scoresTimeGap) >= this.pauseVideoAt) {
//         Video.pause();
//       }
//       const point = this.config.chart.xAxes.values[0].categoryToPoint(this.videoTimeCounter + Math.floor(e.target.currentTime / this.scoresTimeGap));
//       this.config.chart.cursor.triggerMove(point, 'sticky');
//     }
//     else {
//       if (this.pauseVideoAt !== 0 && Math.floor(e.target.currentTime / this.scoresTimeGap) >= this.pauseVideoAt) {
//         Video.pause();
//       }
//       const point = this.config.chart.xAxes.values[0].categoryToPoint(Math.floor(e.target.currentTime / this.scoresTimeGap));
//       this.config.chart.cursor.triggerMove(point, 'sticky');
//     }
//   }
//
//   async seekVideoFrom(e: any): Promise<any> { // seek video to the start
//     console.log('ScreenShare Seek : ', e);
//     const myVideo: any = await document.getElementById('video') as HTMLVideoElement;
//     const myScreenShare: any = await document.getElementById('screenShare') as HTMLVideoElement;
//     this.videoTimeCounter = 0;  // for video
//     this.pauseVideoAt = e.End;
//     myVideo.currentTime = e.Start * this.scoresTimeGap;
//     this.videoTimeCounter = e.Start;
//     if (this.screen !== undefined) {
//       console.log('IF');
//       this.screenShareSeek.start = this.sds.gap + e.Start;
//       this.screenShareSeek.end = this.sds.gap + e.Start + +JSON.stringify(myScreenShare?.duration).split('.')[0];
//       if (e.Start < this.sds.gap || e.Start > (this.sds.gap + +JSON.stringify(myScreenShare?.duration).split('.')[0])) {
//         console.log('IF inside IF');
//         myScreenShare.currentTime = this.sds.gap;
//       }
//       else {
//         console.log('ELSE inside IF');
//         myScreenShare.currentTime = e.Start;
//       }
//     }
//     else {
//       // console.warn('ScreenShare Element not Found : ', this.screen);
//     }
//   }
//
//   seekScreenShareVideoFrom(sec: any): void {
//     console.log('seekScreenShareVideoFrom : ', sec);
//     const myScreenShare: any = document.getElementById('screenShare') as HTMLVideoElement;
//     if (sec >= +this.screenShareSeek.start && sec < +this.screenShareSeek.end) {
//       console.log('ScreenShare Sec : ' + sec + ' , this.screenShareSeek.start : ', this.screenShareSeek.start);
//       myScreenShare.play();
//     }
//     else {
//       myScreenShare.pause();
//     }
//   }
//
//   /*updateVideoAndCursor(): void { // when screen-share video is played manually
//     const myVideo: any = document.getElementById('video') as HTMLVideoElement;
//     myVideo.currentTime = +this.screenShareSeek.start;
//     this.videoTimeCounter = +this.screenShareSeek.start;
//     myVideo.play();
//   }*/
//
//     configureScreenShare(screenShareVideoElement: HTMLVideoElement): void { // to set screen share arguments on initial load
//     this.screenShareSeek.start = this.sds.gap;
//     this.screenShareSeek.end = this.sds.gap + +JSON.stringify(screenShareVideoElement?.duration).split('.')[0];
//     console.log('Start :', this.screenShareSeek.start);
//     console.log('End :', this.screenShareSeek.end);
//     // console.log('ScreenShare Element :', this.screen);
//     console.log('Gap :', this.sds.gap);
//   }
//
//   toggleScreenShare(): void {
//     setTimeout(() => {
//       if (this.screen !== undefined) {
//         this.screen.nativeElement.pause();
//       }
//     }, 500);
//   }
//
//
//
//
// }
/* tslint:disable:max-line-length */
import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SocketService} from 'src/app/modules/shared/services/socket.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ApiService} from 'src/app/modules/shared/services/api.service';
import {ScriptLoadService} from '../../../shared/services/script-load.service';
import {Observable, forkJoin, throwError, of} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {StudentDetailService} from '../../../shared/services/student-detail.service';
import {UtilityService} from '../../../shared/services/utility.service';
import {number} from '@amcharts/amcharts4/core';

declare var MediaStreams: any;

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
  providers: [StudentDetailService]
})
export class StudentDetailComponent implements OnInit {
  @ViewChild('video') video: any;
  @ViewChild('videoScreenAudiio') videoScreenAudiio: any;
  @ViewChild('screen') screen: any;
  // scoresTimeGap: number = +(localStorage.getItem('RealTimeScore') || '');
  scoresTimeGap: number;
  screenShareSeek = {
    start: number,
    end: number
  };
  noop: any;
  allSeriesData: any;
  base = environment.base;
  videoTimeCounter: any = 0;
  pauseVideoAt: any = 0;
  time: any = '00:00:00';
  detectChartDataChange: any;
  liveStreamVideo: any = false;
  params: any;
  check: any;
  dataRaw: any;
  dispChartType = true;
  disableToggle = false;
  roomId: any;
  userId: any;
  eng: any = [];
  value: any = [];
  studentId: any;
  id: any;
  email: any;
  userDetails: any;
  config: any = {
    chart: undefined,
    minuteToggle: false,
    video: undefined,
    dataRaw: undefined
  };


  constructor(private route: ActivatedRoute,
              private ss: SocketService,
              private http: HttpClient,
              private as$: ApiService,
              private sl: ScriptLoadService,
              private sds: StudentDetailService,
              private utility: UtilityService) {
    // this.noop = () => {};

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(next => {
      if (next && next.student_id) {
        this.params = next;
        this.roomId = next.roomid;
        this.nitin(next.roomid);
        if (this.params?.module !== 'manager') {
        } else {
          this.dispChartType = false;
          let UserMediaStream: any = {};
          // this.ss.generateSocket();
          this.sl.load('janus').then((user: any) => {
            this.sl.load('user').then((janus: any) => {
              if (user[0].loaded && janus[0].loaded) {
                UserMediaStream = MediaStreams.filter((el: any) => {
                  if (el.id === this.params.student_id && el.type === 'video') {
                    this.liveStreamVideo = true;
                    return el;
                  }
                });
                setTimeout(() => {
                  const vidElement = document.getElementById('video') as HTMLVideoElement;
                  if (vidElement) {
                    vidElement.srcObject = UserMediaStream[0].stream;
                    vidElement.play();
                  } else {
                    // console.warn('Video Element not found');
                  }
                }, 3000);
                /* this.ss.socket.on('face-data', (data: any) => {
                   if (data && this.params.student_id) {
                     const studentDataLive = {
                       NumberOfFaces: data[this.params.student_id].NumberOfFaces,
                       engagement: data[this.params.student_id].engagement,
                       mood: data[this.params.student_id].mood_score,
                       segment: data[this.params.student_id].segment,
                       createdAt: data[this.params.student_id].createdAt,
                       category: this.utility.setCategory(data[this.params.student_id].engagement),
                       moodCategory: this.utility.setCategory(data[this.params.student_id].mood_score)
                     };
                     this.check = studentDataLive;
                   }
                 });*/
              }
            });
          });
        }
      }

      setTimeout(() => {
        this.detectChartDataChange = false;
      }, 2000);
    });
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.email = this.userDetails.email;

    this.as$.getApiStatic(`userplanDetails?email=${this.email}`).subscribe((data: any) => {
      this.scoresTimeGap = data.data[0].realTimeScores;
    });
  }

  nitin(roomId: any): void {
    this.as$.getApiStatic('getReportData?roomid=' + roomId).subscribe((data: any) => {
      this.eng = data.report.overallEngagement;
      this.getData(this.params);
    });
  }


  getData(params: any): void {
    // const overAllSessiondata = of(JSON.parse(localStorage.getItem('reportData') || '{}').overallEngagement);
    const overAllSessiondata = of(this.eng);
    const userSessionData = this.as$.getApiStatic('report' + '?id=' + params.student_id);
    const userScreenShareData = this.as$.getApiStatic('getScreenShareDetails' + '?uuid=' + params.student_id);
    forkJoin([overAllSessiondata, userSessionData, userScreenShareData])
      .subscribe((results: any) => {
          if (results[1].response?.session_data) {
            results[1].response.session_data = results[1].response.session_data.sort((a: any, b: any) => a.segment - b.segment);
            this.dataRaw = results[1].response;
            this.disableToggle = this.utility.calculateDuration([results[1].response]).duration < 60;
            results[1].response?.session_data?.map((element: any) => {
              element.engagement = element.engagement === null ? 0 : element.engagement;
              element.mood = element.mood === null ? 0 : element.mood;
              element.category = this.utility.setCategory(element.engagement);
              element.moodCategory = this.utility.setCategory(element.mood);
              return element;
            });
          }
          this.allSeriesData = this.sds.getCompiledData(results[0], results[1].response.session_data, results[2].data?.janus);
          console.log('All Series Data :', this.allSeriesData);
          setTimeout(() => {
            if (this.screen !== undefined) {
              this.configureScreenShare(this.screen.nativeElement);
            }
          }, 1000);
        },
        error => {
          console.error(error);
        });
  }

  videoTimeUpdate(e: any, videoPauseState: boolean, triggerFromScreenShare: boolean = false): void { // move chart cursor
    // console.log('Check State :', this.screen, !videoPauseState);
    if (this.screen !== undefined && !videoPauseState) {
      console.log('Inside IF');
      // if (triggerFromScreenShare) {
      this.seekScreenShareVideoFrom(Math.floor(e.target.currentTime));
    } else {
      // console.warn('Screen Share element not found. ', this.screen);
    }
    const Video: any = document.getElementById('video');
    if (this.config?.chart?.data[this.config?.chart?.data?.length - 1].segment >= Math.floor(e.target.currentTime)) {
      if (this.pauseVideoAt !== 0 && this.videoTimeCounter + Math.floor(e.target.currentTime / this.scoresTimeGap) >= this.pauseVideoAt) {
        Video.pause();
      }
      const point = this.config.chart.xAxes.values[0].categoryToPoint(this.videoTimeCounter + Math.floor(e.target.currentTime / this.scoresTimeGap));
      this.config.chart.cursor.triggerMove(point, 'sticky');
    } else {
      if (this.pauseVideoAt !== 0 && Math.floor(e.target.currentTime / this.scoresTimeGap) >= this.pauseVideoAt) {
        Video.pause();
      }
      const point = this.config.chart.xAxes.values[0].categoryToPoint(Math.floor(e.target.currentTime / this.scoresTimeGap));
      this.config.chart.cursor.triggerMove(point, 'sticky');
    }
  }

  async seekVideoFrom(e: any): Promise<any> { // seek video to the start
    console.log('ScreenShare Seek : ', e);
    const myVideo: any = await document.getElementById('video') as HTMLVideoElement;
    const myScreenShare: any = await document.getElementById('screenShare') as HTMLVideoElement;
    this.videoTimeCounter = 0;  // for video
    this.pauseVideoAt = e.End;
    myVideo.currentTime = e.Start * this.scoresTimeGap;
    this.videoTimeCounter = e.Start;
    if (this.screen !== undefined) {
      console.log('IF');
      this.screenShareSeek.start = this.sds.gap + e.Start;
      this.screenShareSeek.end = this.sds.gap + e.Start + +JSON.stringify(myScreenShare?.duration).split('.')[0];
      if (e.Start < this.sds.gap || e.Start > (this.sds.gap + +JSON.stringify(myScreenShare?.duration).split('.')[0])) {
        console.log('IF inside IF');
        myScreenShare.currentTime = this.sds.gap;
      } else {
        console.log('ELSE inside IF');
        myScreenShare.currentTime = e.Start;
      }
    } else {
      // console.warn('ScreenShare Element not Found : ', this.screen);
    }
  }

  seekScreenShareVideoFrom(sec: any): void {
    console.log('seekScreenShareVideoFrom : ', sec);
    const myScreenShare: any = document.getElementById('screenShare') as HTMLVideoElement;
    if (sec >= +this.screenShareSeek.start && sec < +this.screenShareSeek.end) {
      console.log('ScreenShare Sec : ' + sec + ' , this.screenShareSeek.start : ', this.screenShareSeek.start);
      myScreenShare.play();
    } else {
      myScreenShare.pause();
    }
  }

  /*updateVideoAndCursor(): void { // when screen-share video is played manually
    const myVideo: any = document.getElementById('video') as HTMLVideoElement;
    myVideo.currentTime = +this.screenShareSeek.start;
    this.videoTimeCounter = +this.screenShareSeek.start;
    myVideo.play();
  }*/

  configureScreenShare(screenShareVideoElement: HTMLVideoElement): void { // to set screen share arguments on initial load
    this.screenShareSeek.start = this.sds.gap;
    this.screenShareSeek.end = this.sds.gap + +JSON.stringify(screenShareVideoElement?.duration).split('.')[0];
    console.log('Start :', this.screenShareSeek.start);
    console.log('End :', this.screenShareSeek.end);
    console.log('Gap :', this.sds.gap);
  }

  toggleScreenShare(): void {
    setTimeout(() => {
      if (this.screen !== undefined) {
        this.screen.nativeElement.pause();
      }
    }, 500);
  }


}
