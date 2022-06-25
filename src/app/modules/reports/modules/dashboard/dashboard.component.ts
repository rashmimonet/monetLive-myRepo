// import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
// import {ActivatedRoute, Router} from '@angular/router';
// import {DatePipe} from '@angular/common';
// import {ApiService} from '../../../shared/services/api.service';
// import {ScriptLoadService} from '../../../shared/services/script-load.service';
// import {BehaviourSubjectsService} from '../../../../services/behaviour-subjects.service';
// import {DashboardService} from './dashboard.service';
// import {UtilityService} from "../../../shared/services/utility.service";
// import {SocketService} from "../../../shared/services/socket.service";
//
// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss'],
//   providers: [ApiService, DashboardService, SocketService]
// })
// export class DashboardComponent implements OnInit {
//   linkEnabled: boolean = JSON.parse(localStorage.getItem('userPlanDetails') || '{}').postMeetingAnalytics;
//   minuteToggle: any = true;
//   sessionDataMinutes: any = [];
//   sessionDataSeconds: any = [];
//   pieChartData: any;
//   engOrMood: any;
//   percentArr: any = [];
//   segUsersArr: any = [];
//   moodpercentArr: any = [];
//   moodsegUsersArr: any = [];
//   selection: any;
//   duration: any = 0;
//   param: any;
//   callDetails: any = JSON.parse(localStorage.getItem('callDetails') || '{}');
//   segmentData: any = [];
//   category: any;
//   students: any = [];
//   dispStdList: any = false;
//   headingDuration: any;
//   dispCatSpecificData: any =  false;
//
//   segments: any[] = [
//    {name: 'HIGH ' , eng : 'ENGAGEMENT', mood : 'MOOD', indivSegKeyMap: 'hi_percentage', category: 'High', valMin: 80, valMax: 1000, className: 'title-success16-400', color: '#1FA000'},
//    {name: 'MID ', eng : 'ENGAGEMENT' , mood : 'MOOD' , indivSegKeyMap: 'med_percentage', category: 'Medium', valMin: 40, valMax: 80, className: 'title-warning16-400', color: '#D5AD2A'},
//    {name: 'LOW ', eng : 'ENGAGEMENT' , mood : 'MOOD' , indivSegKeyMap: 'low_percentage', category: 'Low', valMin: 0, valMax: 40, className: 'title-danger16-400', color: '#BA0E15'},
//    {name: 'CAMERA OFF ',  eng : '' , mood : ''       , indivSegKeyMap: 'camoff_percentage', category: 'camOff', valMin: false, valMax: false, className: 'title-gray16-400', color: '#262525'}];
//
//   segmentDuration: any[] = [
//     {name: '1st hour', value: 1, selected: true},
//     // {name: '2nd hour', value: 2, selected: false}
//   ];
//   metricType: any = {
//       category: '',
//       segmentName: '',
//       engType: 'Session',
//       percentArr: [],
//   };
//   categoryFilterVal: any = 'category';
//
//   segSpecificData: any = {
//     name: [],
//     percent: [],
//     participantsCount: [],
//     users: [],
//     moodPercent: [],
//     moodParticipantsCount: [],
//     moodUsers: [],
//     categoryText: '',
//     categoryMetric: '',
//     category: '',
//     color: '',
//     iconClassName: '',
//   };
//
//   constructor(
//     private router: Router,
//     private date: DatePipe,
//     private as: ApiService,
//     private ss: SocketService,
//     private route: ActivatedRoute,
//     private sl: ScriptLoadService,
//     public cdRef: ChangeDetectorRef,
//     private bhvSub: BehaviourSubjectsService,
//     private dashService: DashboardService,
//     private zone: NgZone,
//     private utility: UtilityService
//   ) {}
//
//   ngOnInit(): void {
//     // this.ss.generateSocket();
//     this.route.queryParams.subscribe( (next: any) => {
//       if (next) {
//         this.param = next;
//         this.getDashboardData(JSON.parse(localStorage.getItem('reportData') || '{}'));
//         if (JSON.parse(localStorage.getItem('avg-eng-res') || '[]') && this.segmentData.length === 0) {
//           this.createSegment(JSON.parse(localStorage.getItem('avg-eng-res') || '[]'));
//         }
//       }
//     });
//     this.bhvSub.engOrMood$.subscribe((data: any) => {
//       this.engOrMood = data;
//       this.categoryFilterVal = data ? 'moodCategory' : 'category';
//       this.metricType.engType = data === 0 ? 'Session' : 'Mood';
//       this.metricType.category = data === 0 ? 'segCategory' : 'segMoodCategory';
//       this.metricType.segmentName = data === 0 ? 'ENGAGEMENT' : 'MOOD';
//     });
//   }
//
//   createSegment(data: any): void {
//     data.forEach((el: any) => {
//       el.stdCallDuration = this.utility.convertDate(el.engagement_avg, 60);
//     });
//
//     if (this.callDetails) {
//       this.duration = this.utility.calculateDuration(data).duration;
//       if (this.duration > 3600) {
//         this.segmentDuration.push({name: '2nd hour', value: 2, selected: false});
//       }
//       this.duration = Math.round(this.duration / 4);
//       for (let i = 1; i <= 4; i++) {
//         this.headingDuration =  this.utility.convertDate(this.duration * (1), this.callDetails.duration);
//         const seg: any = {
//           segment: i,
//           data: [],
//           metricAverage: {high: 0, medium: 0, low: 0, camOff: 0},
//           moodAverage: {high: 0, medium: 0, low: 0, camOff: 0},
//           catSpecificData: {high: [], medium: [], low: [], camOff: []},
//           metricCount: 0,
//           duration: this.utility.convertDate(this.duration * (i - 1), this.callDetails.duration) + ' - ' +
//             this.utility.convertDate(this.duration * i, this.callDetails.duration)
//         };
//         const arr = JSON.parse(JSON.stringify(data));
//         if (i === 1) {
//           this.callDetails.engagementAvg = 0;
//         }
//         arr.map( (std: any) => { // student array
//           if (i === 1) {
//             this.callDetails.engagementAvg += (std.engagement_avg !== null ? std.engagement_avg : 0);
//           }
//           std.segEngagement = 0;
//           std.segMood = 0;
//           std.category = this.utility.setCategory(std.engagement);
//           std.engagement_data = std.session_data.filter((metric: any) => {
//             if (metric.segment >= (this.duration * (i - 1)) && metric.segment < (this.duration * i)) {
//               metric.category = this.utility.setCategory(metric.engagement);
//               metric.moodCategory = this.utility.setCategory(metric.mood);
//               std.segMood += metric.mood !== null ? metric.mood : 0;
//               std.segEngagement += metric.engagement !== null ? metric.engagement : 0;
//               return metric;
//             }
//           });
//           std.segMood = std.segMood ? Math.round(std.segMood / std.engagement_data.length) : null;
//           std.segEngagement = std.segEngagement ? Math.round(std.segEngagement / std.engagement_data.length) : null;
//           std.segCategory = this.utility.setCategory(std.engagement_avg);
//           seg.metricCount += std.session_data.length;
//           seg.data.push(std);
//           return std;
//         });
//         for (let y = 0; i === 1 && y < 4; y++) {
//           seg.catSpecificData[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter( (std: any) => std.segCategory === `${this.segments[y].category}`);
//           seg.metricAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter( (std: any) => std.segCategory === `${this.segments[y].category}`).length;
//           seg.moodAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter( (std: any) => std.segMoodCategory === `${this.segments[y].category}`).length;
//         }
//         this.zone.run(() => this.segmentData.push(seg));
//       }
//       // console.log('Segment Data :', this.segmentData);
//       this.callDetails.engagementAvg = Math.round(this.callDetails.engagementAvg / data.length);
//     }
//   }
//
// /*  toggle(e: any): any {
//     this.minuteToggle = e.checked; // false in case of 'seconds'
//   }*/
//
//   getDashboardData(data: any): void {
//     let index = 1;
//     if (data && data?.pieData.length && data?.overallEngagement.length) {
//       this.pieChartData = data.pieData.map((el: any) => {
//         el.UAE.map((user: any) => {
//           user.average = user.average.toFixed(2);
//           user.average_mood = user.average_mood.toFixed(2);
//         });
//         return el;
//       });
//       this.sessionDataSeconds = data.overallEngagement.map((el: any) => {
//         el.segment = index++;
//         el.category = this.utility.setCategory(el.average_engagement);
//         el.moodCategory = this.utility.setCategory(el.average_mood);
//         return el;
//       });
//       this.sessionDataMinutes = this.dashService.SecArrToMinuteArr(data.overallEngagement);
//     }
//     else {
//       console.error('Data Not Available');
//     }
//   }
//
//   spline(cat: any): void {
//     this.router.navigate(['report/category-detail'], {queryParams: {catType: cat.category.toLowerCase()}, queryParamsHandling: 'merge'});
//   }
//
//   segmentWiseScore(selection: any): any { //  percentage calculation for segments (list below pie chart)
//    for (let i = 0; i < 4; i++) {
//       this.dashService.updateArr(i, selection, this);
//    }
//   }
//
//   studentListPanel(val: any): void {
//     this.dispStdList = val;
//   }
//
//   getCategoryVal(): any {
//     return this.categoryFilterVal;
//   }
//
//   individualSegmentScores(cat: any): void { // calculations done for selected segment
//     this.segSpecificData.name = [{name : cat.name + 'ENGAGEMENT'}, {name : cat.name + 'MOOD'}];
//     this.segSpecificData.categoryText =  cat.name;
//     this.segSpecificData.categoryMetric = this.engOrMood === 0 ? 'ENGAGEMENT' : 'MOOD';
//     this.segSpecificData.category = cat.category === 'camOff' ? cat.category : cat.category;
//     this.segSpecificData.color = cat.color;
//     this.segSpecificData.iconClassName = cat.className;
//     this.segSpecificData[`percent`] = [];
//     this.segSpecificData[`participantsCount`] = [];
//     this.segSpecificData[`users`] = [];
//     this.segSpecificData[`moodPercent`] = [];
//     this.segSpecificData[`moodParticipantsCount`] = [];
//     this.segSpecificData[`moodUsers`] = [];
//     this.dispCatSpecificData = true;
//     this.dispStdList = false;
//
//     for (let i = 0; i < this.pieChartData.length; i++) {
//       this.segSpecificData[`percent`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][0].toFixed(2);
//       this.segSpecificData[`participantsCount`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][1].uuid.length;
//       this.segSpecificData[`users`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) =>  el.category === cat.category) : [];
//       this.segSpecificData[`moodPercent`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][3].toFixed(2);
//       this.segSpecificData[`moodParticipantsCount`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][2].uuid.length;
//       this.segSpecificData[`moodUsers`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) => el.moodCategory === cat.category) : [];
//     }
//   }
// }
import { ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../../shared/services/api.service';
import { ScriptLoadService } from '../../../shared/services/script-load.service';
import { BehaviourSubjectsService } from '../../../../services/behaviour-subjects.service';
import { DashboardService } from './dashboard.service';
import { UtilityService } from "../../../shared/services/utility.service";
import { SocketService } from "../../../shared/services/socket.service";
import { ReportServiceService } from '../../report-service.service';
import { HttpClient } from '@angular/common/http';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ApiService, DashboardService, SocketService]
})
export class DashboardComponent implements OnInit {
  status: boolean;
  // linkEnabled: boolean = JSON.parse(localStorage.getItem('userPlanDetails') || '{}').postMeetingAnalytics;
  linkEnabled: boolean;
  minuteToggle: any = true;
  roomId: any;
  sessionDataMinutes: any = [];
  sessionDataSeconds: any = [];
  pieChartData: any;
  engOrMood: any;
  percentArr: any = [];
  segUsersArr: any = [];
  moodpercentArr: any = [];
  moodsegUsersArr: any = [];
  selection: any;
  duration: any = 0;
  param: any;
  // callDetails: any = JSON.parse(localStorage.getItem('callDetails') || '{}');
  // callDetails: any =  this.http.get(`https://www.monetlive.com/many/api/report-pdf?roomid=${this.roomId}`);
  segmentData: any = [];
  category: any;
  students: any = [];
  dispStdList: any = false;
  headingDuration: any;
  dispCatSpecificData: any = false;
  studentData: any = [];
  studentReportData: any;
  reportData: any;
  dynamicLink: any = '';
  callDetails: any;
  lis: any = [];
  paymentError = false;
  next: any;
  gettingData: boolean;
  userId: any;
  userDetails: any;
  email: any;
  createrId: any;
  segments: any[] = [
    { name: 'HIGH ', eng: 'ENGAGEMENT', mood: 'MOOD', indivSegKeyMap: 'hi_percentage', category: 'High', valMin: 80, valMax: 100, className: 'title-success16-400', color: '#1FA000' },
    { name: 'MID ', eng: 'ENGAGEMENT', mood: 'MOOD', indivSegKeyMap: 'med_percentage', category: 'Medium', valMin: 40, valMax: 80, className: 'title-warning16-400', color: '#D5AD2A' },
    { name: 'LOW ', eng: 'ENGAGEMENT', mood: 'MOOD', indivSegKeyMap: 'low_percentage', category: 'Low', valMin: 0, valMax: 40, className: 'title-danger16-400', color: '#BA0E15' },
  ];

  // {name: 'CAMERA OFF ',  eng : '' , mood : ''       , indivSegKeyMap: 'camoff_percentage', category: 'camOff', valMin: false, valMax: false, className: 'title-gray16-400', color: '#262525'}

  segmentDuration: any[] = [
    { name: '1st hour', value: 1, selected: true },
    // {name: '2nd hour', value: 2, selected: false}
  ];
  metricType: any = {
    category: '',
    engagement: '',
    segmentName: '',
    engType: 'Session',
    percentArr: [],
  };
  categoryFilterVal: any = 'category';

  segSpecificData: any = {
    name: [],
    percent: [],
    participantsCount: [],
    users: [],
    moodPercent: [],
    moodParticipantsCount: [],
    moodUsers: [],
    categoryText: '',
    categoryMetric: '',
    category: '',
    color: '',
    iconClassName: '',
  };
  sectionData: any = {
    count: [],
    percent: [],
    moodCount: [],
    moodPercent: []
  }

  constructor(
    private router: Router,
    private date: DatePipe,
    private api: ApiService,
    private ss: SocketService,
    private route: ActivatedRoute,
    private sl: ScriptLoadService,
    public cdRef: ChangeDetectorRef,
    private bhvSub: BehaviourSubjectsService,
    private dashService: DashboardService,
    private zone: NgZone,
    private utility: UtilityService,
    private repo: ReportServiceService,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe(next => {
      if (next) {
        this.roomId = next.roomid;
        this.gettingData = true;
      }
    })

  }

  ngOnInit(): void {
    // debugger
    this.api.getApiStatic(`avg-engagement-req?roomid=` + this.roomId).subscribe((data: any) => {
      this.studentData = data;
      if ((this.studentData || '[]') && this.segmentData.length === 0) {
        this.createSegment((this.studentData || '[]'));
      }

    })
    this.generateReport(this.roomId);
    // this.api.getApiStatic(`getReportData?roomid=` + this.roomId ).subscribe((data: any) => {
    //   let interval: any;
    //   this.studentReportData = data;
    //   this.reportData = data.report;
    //   this.createrId = data.report.creator_ID;
    //   if(data.report.pdf === null){
    //     this.api.getApiStatic(`getPdfData?roomid=${this.roomId}`).subscribe((data: any) =>{                       //report-pdf changed to generatePdfData
    //       if(data.code === 202){   //is generating
    //         interval = setInterval(() => {
    //           this.checkReportRes(roomId);
    //         }, 500);
    //       }
    //     this.callDetails = data.report;
    //     })
    //   }else{
    //     this.callDetails = data.report.pdf;
    //   }
    //   this.getDashboardData(this.reportData);
    // })

    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.email = this.userDetails.email;

    this.api.getApiStatic(`userplanDetails?email=${this.email}`).subscribe((data: any) => {
      this.linkEnabled = data.data[0].postMeetingAnalytics;
    })


    // this.http.get(`https://www.monetlive.com/many/api/report-pdf?roomid=${this.roomId}`).subscribe(Response => {
    //   this.lis = Response;
    //   this.callDetails = this.lis.data;
    // })

    this.bhvSub.engOrMood$.subscribe((data: any) => {
      this.engOrMood = data;
      this.categoryFilterVal = data ? 'category' : 'moodCategory';
      this.metricType.engType = data === 0 ? 'Session' : 'Mood';
      this.metricType.category = data === 0 ? 'segCategory' : 'segMoodCategory';
      this.metricType.segmentName = data === 0 ? 'ENGAGEMENT' : 'MOOD';
    });
  }
  generateReport(roomId: number) {
    this.api.getApiStatic(`getReportData?roomid=` + this.roomId).subscribe((data: any) => {
      let interval: any;
      this.studentReportData = data;
      this.reportData = data.report;
      this.createrId = data.report.creator_ID;
      if (data.report.pdf === null) {
        this.api.getApiStatic(`getPdfData?roomid=${this.roomId}`).subscribe((data: any) => {                       //report-pdf changed to generatePdfData
          if (data.code === 202) {   //is generating
            interval = setInterval(() => {
              this.generateReport(roomId);
            }, 500);
          }else if(data.code === 200){
            this.callDetails = data.pdf;
          }
          else if (data?.code === 404) { // error generating report
            clearInterval(interval);
            this.api.getApiStatic(`generatePdfData?roomid=${this.roomId}&creator_ID=${this.createrId}`).subscribe((res: any) => {
              this.callDetails = res.report;
            },
              (err: any) => console.error('Generate Report API error', err));
          }
        })
      } else {
        this.callDetails = data.report.pdf;
      }
      this.getDashboardData(this.reportData);
    })

  }
  createSegment(data: any): void {
    data.forEach((el: any) => {
      el.stdCallDuration = this.utility.convertDate(el.engagement_avg, 60);
    });

    if (this.callDetails) {
      this.duration = this.utility.calculateDuration(data).duration;
      if (this.duration > 3600) {
        this.segmentDuration.push({ name: '2nd hour', value: 2, selected: false });
      }
      this.duration = Math.round(this.duration / 4);
      for (let i = 1; i <= 4; i++) {
        this.headingDuration = this.utility.convertDate(this.duration * (1), this.callDetails.callDuration);
        const seg: any = {
          segment: i,
          data: [],
          metricAverage: { high: 0, medium: 0, low: 0, camOff: 0 },
          moodAverage: { high: 0, medium: 0, low: 0, camOff: 0 },
          catSpecificData: { high: [], medium: [], low: [], camOff: [] },
          metricCount: 0,
          duration: this.utility.convertDate(this.duration * (i - 1), this.callDetails.callDuration) + ' - ' +
            this.utility.convertDate(this.duration * i, this.callDetails.callDuration)
        };
        const arr = JSON.parse(JSON.stringify(data));
        if (i === 1) {
          this.callDetails.engagementAvg = 0;
        }
        arr.map((std: any) => { // student array
          if (i === 1) {
            this.callDetails.engagementAvg += (std.engagement_avg !== null ? std.engagement_avg : 0);
          }
          std.segEngagement = 0;
          std.segMood = 0;
          std.category = this.utility.setCategory(std.engagement);
          std.engagement_data = std.session_data.filter((metric: any) => {
            if (metric.segment >= (this.duration * (i - 1)) && metric.segment < (this.duration * i)) {
              metric.category = this.utility.setCategory(metric.engagement);
              metric.moodCategory = this.utility.setCategory(metric.mood);
              std.segMood += metric.mood !== null ? metric.mood : 0;
              std.segEngagement += metric.engagement !== null ? metric.engagement : 0;
              return metric;
            }
          });
          std.segMood = std.segMood ? Math.round(std.segMood / std.engagement_data.length) : null;
          std.segEngagement = std.segEngagement ? Math.round(std.segEngagement / std.engagement_data.length) : null;
          std.segCategory = this.utility.setCategory(std.engagement_avg);
          seg.metricCount += std.session_data.length;
          seg.data.push(std);
          return std;
        });
        for (let y = 0; i === 1 && y < 3; y++) {
          seg.catSpecificData[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segCategory === `${this.segments[y].category}`);
          seg.metricAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segCategory === `${this.segments[y].category}`).length;
          seg.moodAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segMoodCategory === `${this.segments[y].category}`).length;
        }
        this.zone.run(() => this.segmentData.push(seg));
      }
      this.callDetails.engagementAvg = Math.round(this.callDetails.engagementAvg / data.length);
    }
  }

  getDashboardData(data: any): void {
    // debugger
    let index = 1;
    if (data && data?.pieData.length && data?.overallEngagement.length) {
      this.pieChartData = data.pieData.map((el: any) => {
        el.UAE.map((user: any) => {
          user.average = user.average.toFixed(2);
          user.average_mood = user.average_mood.toFixed(2);
        });
        return el;
      });
      this.sessionDataSeconds = data.overallEngagement.map((el: any) => {
        el.segment = index++;
        el.category = this.utility.setCategory(el.average_engagement);
        el.moodCategory = this.utility.setCategory(el.average_mood);
        return el;
      });
      this.sessionDataMinutes = this.dashService.SecArrToMinuteArr(data.overallEngagement);
    }
    else {
      console.error('Data Not Available');
    }

  }

  spline(cat: any): void {
    this.router.navigate(['report/category-detail'], { queryParams: { catType: cat.category.toLowerCase() }, queryParamsHandling: 'merge' });
  }

  segmentWiseScore(selection: any): any { //  percentage calculation for segments (list below pie chart)
    for (let i = 0; i < 4; i++) {
      this.dashService.updateArr(i, selection, this);
    }
  }

  studentListPanel(val: boolean): void {
    this.dispStdList = val;
  }

  getCategoryVal(): any {
    return this.categoryFilterVal;
  }

  individualSegmentScores(cat: any): void { // calculations done for selected segment
    this.segSpecificData.name = [{ name: cat.name + 'ENGAGEMENT' }, { name: cat.name + 'MOOD' }];
    this.segSpecificData.categoryText = cat.name;
    this.segSpecificData.categoryMetric = this.engOrMood === 0 ? 'ENGAGEMENT' : 'MOOD';
    this.segSpecificData.category = cat.category === 'camOff' ? cat.category : cat.category;
    this.segSpecificData.color = cat.color;
    this.segSpecificData.iconClassName = cat.className;
    this.segSpecificData[`percent`] = [];
    this.segSpecificData[`participantsCount`] = [];
    this.segSpecificData[`users`] = [];
    this.segSpecificData[`moodPercent`] = [];
    this.segSpecificData[`moodParticipantsCount`] = [];
    this.segSpecificData[`moodUsers`] = [];
    this.dispCatSpecificData = true;
    this.dispStdList = false;

    for (let i = 0; i < this.pieChartData.length; i++) {
      this.segSpecificData[`percent`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][0].toFixed(2);
      this.segSpecificData[`participantsCount`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][1].uuid.length;
      this.segSpecificData[`users`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) => el.category === cat.category) : [];
      this.segSpecificData[`moodPercent`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][3].toFixed(2);
      this.segSpecificData[`moodParticipantsCount`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][2].uuid.length;
      this.segSpecificData[`moodUsers`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) => el.moodCategory === cat.category) : [];
    }
  }
  changeStatus() {
    // console.log('First value', this.repo._dataSource.value);

    this.minuteToggle = !this.minuteToggle
    this.repo._dataSource.next(this.minuteToggle);

    // console.log('change', this.minuteToggle)
  }


}
