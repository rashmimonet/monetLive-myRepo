// // // import {DatePipe} from '@angular/common';
// // // import {ChangeDetectorRef, Component, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
// // // import {ActivatedRoute, Router} from '@angular/router';
// // // import {ApiService} from 'src/app/modules/shared/services/api.service';
// // // import {ScriptLoadService} from 'src/app/modules/shared/services/script-load.service';
// // // import {SocketService} from 'src/app/modules/shared/services/socket.service';
// // // import {UtilityService} from 'src/app/modules/shared/services/utility.service';
// // // import {BehaviourSubjectsService} from 'src/app/services/behaviour-subjects.service';
// // // import {DashboardService} from '../dashboard/dashboard.service';
// // // import {jsPDF} from 'jspdf';
// // // import html2canvas from 'html2canvas';
// // // import {HttpClient} from "@angular/common/http";
// // //
// // // // import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// // //
// // // @Component({
// // //   selector: 'app-spline',
// // //   templateUrl: './spline.component.html',
// // //   styleUrls: ['./spline.component.scss']
// // // })
// // // export class SplineComponent implements OnInit, OnChanges {
// // //
// // //   studentAttendance: any;
// // //   speakingScore: any;
// // //   roomId: any;
// // //   li: any;
// // //   lis: any=[];
// // //   top5Engaging: Array<any> = [];
// // //   bottom5Engaging: Array<any> = [];
// // //
// // //   linkEnabled: boolean = JSON.parse(localStorage.getItem('userPlanDetails') || '{}').postMeetingAnalytics;
// // //   minuteToggle: any = true;
// // //   sessionDataMinutes: any = [];
// // //   sessionDataSeconds: any = [];
// // //   pieChartData: any;
// // //   engOrMood: any;
// // //   percentArr: any = [];
// // //   segUsersArr: any = [];
// // //   moodpercentArr: any = [];
// // //   moodsegUsersArr: any = [];
// // //   selection: any;
// // //   duration: any = 0;
// // //   param: any;
// // //   callDetails: any = JSON.parse(localStorage.getItem('callDetails') || '{}');
// // //   segmentData: any = [];
// // //   category: any;
// // //   students: any = [];
// // //   dispStdList: any = false;
// // //   headingDuration: any;
// // //   dispCatSpecificData: any = false;
// // //   studentList: any;
// // //   // arr1:any =[];
// // //
// // //   segments: any[] = [
// // //     {
// // //       name: 'HIGH ',
// // //       eng: 'ENGAGEMENT',
// // //       mood: 'MOOD',
// // //       indivSegKeyMap: 'hi_percentage',
// // //       category: 'High',
// // //       valMin: 80,
// // //       valMax: 1000,
// // //       className: 'title-success16-400',
// // //       color: '#1FA000'
// // //     },
// // //     {
// // //       name: 'MID ',
// // //       eng: 'ENGAGEMENT',
// // //       mood: 'MOOD',
// // //       indivSegKeyMap: 'med_percentage',
// // //       category: 'Medium',
// // //       valMin: 40,
// // //       valMax: 80,
// // //       className: 'title-warning16-400',
// // //       color: '#D5AD2A'
// // //     },
// // //     {
// // //       name: 'LOW ',
// // //       eng: 'ENGAGEMENT',
// // //       mood: 'MOOD',
// // //       indivSegKeyMap: 'low_percentage',
// // //       category: 'Low',
// // //       valMin: 0,
// // //       valMax: 40,
// // //       className: 'title-danger16-400',
// // //       color: '#BA0E15'
// // //     },
// // //     {
// // //       name: 'CAMERA OFF ',
// // //       eng: '',
// // //       mood: '',
// // //       indivSegKeyMap: 'camoff_percentage',
// // //       category: 'camOff',
// // //       valMin: false,
// // //       valMax: false,
// // //       className: 'title-gray16-400',
// // //       color: '#262525'
// // //     }];
// // //
// // //   segmentDuration: any[] = [
// // //     {name: '1st hour', value: 1, selected: true},
// // //     // {name: '2nd hour', value: 2, selected: false}
// // //   ];
// // //   metricType: any = {
// // //     category: '',
// // //     segmentName: '',
// // //     engType: 'Session',
// // //     percentArr: [],
// // //   };
// // //   categoryFilterVal: any = 'category';
// // //
// // //   segSpecificData: any = {
// // //     name: [],
// // //     percent: [],
// // //     participantsCount: [],
// // //     users: [],
// // //     moodPercent: [],
// // //     moodParticipantsCount: [],
// // //     moodUsers: [],
// // //     categoryText: '',
// // //     categoryMetric: '',
// // //     category: '',
// // //     color: '',
// // //     iconClassName: '',
// // //   };
// // //
// // //   engType: any;
// // //   metric: any;
// // //   attendees: any = 0;
// // //   userDetails: any;
// // //   room: any;
// // //   reportData: any;
// // //   message: any;
// // //
// // //
// // //   constructor(private router: Router,
// // //               private date: DatePipe,
// // //               private as: ApiService,
// // //               private http: HttpClient,
// // //               private ss: SocketService,
// // //               private route: ActivatedRoute,
// // //               private sl: ScriptLoadService,
// // //               public cdRef: ChangeDetectorRef,
// // //               private bhvSub: BehaviourSubjectsService,
// // //               private dashService: DashboardService,
// // //               private zone: NgZone,
// // //               private utility: UtilityService,
// // //   ) {
// // //     this.route.queryParams.subscribe(next => {
// // //       if (next) {
// // //         this.roomId = next.roomid;
// // //         this.getRoom(next.roomid);
// // //       }
// // //     });
// // //   }
// // //
// // //   getRoom(roomid: any): void {
// // //     this.as.getApi('getInviteRoom?roomid=' + roomid).subscribe(next => {
// // //       if (next) {
// // //         this.room = next.response;
// // //       }
// // //     });
// // //   }
// // //
// // //
// // //   public convertToPDF() {
// // //
// // //     html2canvas(document.getElementById('report')!).then(canvas => {
// // //       const contentDataURL = canvas.toDataURL('image/png');
// // //       const pdf = new jsPDF('p', 'mm', 'a4');
// // //       const width = 210;
// // //       const height = 297;
// // //       pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
// // //       pdf.save('output.pdf');
// // //       // console.log('downloaded');
// // //     });
// // //   }
// // //
// // //   ngOnChanges(changes: SimpleChanges): void {
// // //     console.log('test', changes);
// // //   }
// // //
// // //   //   ngOnInit(): void {
// // //   //     this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
// // //   //    this.userDetails.email;
// // //   //    console.log(this.userDetails.name);
// // //
// // //   //    this.reportData = JSON.parse(localStorage.getItem('reportData'));
// // //   //    this.reportData.report.averageEngagement;
// // //   //    console.log(this.reportData.report.averageEngagement);
// // //   // }
// // //
// // //   ngOnInit(): void {
// // //     this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
// // //
// // //     this.userDetails.email;
// // //     console.log(this.userDetails.name);
// // //
// // //     this.reportData = JSON.parse(localStorage.getItem('reportData'));
// // //     this.reportData.report.averageEngagement;
// // //     console.log(this.reportData.report.averageEngagement);
// // //
// // //     this.reportData.report.averageMood;
// // //     console.log(this.reportData.report.averageEngagement);
// // //     console.log('mod data', this.reportData.report.averageMood);
// // //     this.callDetails = JSON.parse(localStorage.getItem('callDetails'));
// // //     this.callDetails.time;
// // //     this.http.get(`https://www.monetlive.com/many/api/report-pdf?roomid=${this.roomId}`)
// // //       .subscribe(Response => {
// // //         console.log('attendance',Response)
// // //         this.lis = Response;
// // //         this.studentAttendance = this.lis.data.attendance;
// // //         console.log('Attendance', this.studentAttendance);
// // //         this.li = this.lis.data.students;
// // //         console.log('studentData', this.lis.data.students);
// // //         this.sortData(this.lis.data.students);
// // //         this.sortData1(this.lis.data.students);
// // //         this.speakingScore = this.lis.data.speakingScore;
// // //         if(!this.speakingScore){
// // //           console.log(0);
// // //           this.speakingScore = 0;
// // //         }else{
// // //           console.log('Speaking', this.speakingScore);
// // //           this.speakingScore;
// // //         }
// // //       });
// // //
// // //     this.students = JSON.parse(localStorage.getItem('students'));
// // //     this.sortData(this.students);
// // //     this.sortData1(this.students);
// // //
// // //     // this.students.name;
// // //
// // //     this.route.queryParams.subscribe((next: any) => {
// // //       if (next) {
// // //         this.param = next;
// // //         this.getDashboardData(JSON.parse(localStorage.getItem('reportData') || '{}'));
// // //         if (JSON.parse(localStorage.getItem('avg-eng-res') || '[]') && this.segmentData.length === 0) {
// // //           this.createSegment(JSON.parse(localStorage.getItem('avg-eng-res') || '[]'));
// // //         }
// // //       }
// // //     });
// // //     this.bhvSub.engOrMood$.subscribe((data: any) => {
// // //       this.engOrMood = data;
// // //       this.categoryFilterVal = data ? 'moodCategory' : 'category';
// // //       this.metricType.engType = data === 0 ? 'Session' : 'Mood';
// // //       this.metricType.category = data === 0 ? 'segCategory' : 'segMoodCategory';
// // //       this.metricType.segmentName = data === 0 ? 'ENGAGEMENT' : 'MOOD';
// // //     });
// // //
// // //
// // //   }
// // //
// // //   // max2(max2: any) {
// // //   //   throw new Error('Method not implemented.');
// // //   // }
// // //
// // //   createSegment(data: any): void {
// // //     data.forEach((el: any) => {
// // //       el.stdCallDuration = this.utility.convertDate(el.engagement_avg, 60);
// // //     });
// // //
// // //     if (this.callDetails) {
// // //       this.duration = this.utility.calculateDuration(data).duration;
// // //       if (this.duration > 3600) {
// // //         this.segmentDuration.push({name: '2nd hour', value: 2, selected: false});
// // //       }
// // //       this.duration = Math.round(this.duration / 4);
// // //       for (let i = 1; i <= 4; i++) {
// // //         this.headingDuration = this.utility.convertDate(this.duration * (1), this.callDetails.duration);
// // //         const seg: any = {
// // //           segment: i,
// // //           data: [],
// // //           metricAverage: {high: 0, medium: 0, low: 0, camOff: 0},
// // //           moodAverage: {high: 0, medium: 0, low: 0, camOff: 0},
// // //           catSpecificData: {high: [], medium: [], low: [], camOff: []},
// // //           metricCount: 0,
// // //           duration: this.utility.convertDate(this.duration * (i - 1), this.callDetails.duration) + ' - ' +
// // //             this.utility.convertDate(this.duration * i, this.callDetails.duration)
// // //         };
// // //         const arr = JSON.parse(JSON.stringify(data));
// // //         if (i === 1) {
// // //           this.callDetails.engagementAvg = 0;
// // //         }
// // //         arr.map((std: any) => { // student array
// // //           if (i === 1) {
// // //             this.callDetails.engagementAvg += (std.engagement_avg !== null ? std.engagement_avg : 0);
// // //           }
// // //           std.segEngagement = 0;
// // //           std.segMood = 0;
// // //           std.category = this.utility.setCategory(std.engagement);
// // //           std.engagement_data = std.session_data.filter((metric: any) => {
// // //             if (metric.segment >= (this.duration * (i - 1)) && metric.segment < (this.duration * i)) {
// // //               metric.category = this.utility.setCategory(metric.engagement);
// // //               metric.moodCategory = this.utility.setCategory(metric.mood);
// // //               std.segMood += metric.mood !== null ? metric.mood : 0;
// // //               std.segEngagement += metric.engagement !== null ? metric.engagement : 0;
// // //               return metric;
// // //             }
// // //           });
// // //           std.segMood = std.segMood ? Math.round(std.segMood / std.engagement_data.length) : null;
// // //           std.segEngagement = std.segEngagement ? Math.round(std.segEngagement / std.engagement_data.length) : null;
// // //           std.segCategory = this.utility.setCategory(std.engagement_avg);
// // //           seg.metricCount += std.session_data.length;
// // //           seg.data.push(std);
// // //           return std;
// // //         });
// // //         for (let y = 0; i === 1 && y < 4; y++) {
// // //           seg.catSpecificData[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segCategory === `${this.segments[y].category}`);
// // //           seg.metricAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segCategory === `${this.segments[y].category}`).length;
// // //           seg.moodAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segMoodCategory === `${this.segments[y].category}`).length;
// // //         }
// // //         this.zone.run(() => this.segmentData.push(seg));
// // //       }
// // //       console.log('Segment Data :', this.segmentData);
// // //       this.callDetails.engagementAvg = Math.round(this.callDetails.engagementAvg / data.length);
// // //     }
// // //   }
// // //
// // //   /*  toggle(e: any): any {
// // //       this.minuteToggle = e.checked; // false in case of 'seconds'
// // //     }*/
// // //
// // //   getDashboardData(data: any): void {
// // //     let index = 1;
// // //     if (data && data?.pieData.length && data?.overallEngagement.length) {
// // //       this.pieChartData = data.pieData.map((el: any) => {
// // //         el.UAE.map((user: any) => {
// // //           user.average = user.average.toFixed(2);
// // //           user.average_mood = user.average_mood.toFixed(2);
// // //         });
// // //         return el;
// // //       });
// // //       this.sessionDataSeconds = data.overallEngagement.map((el: any) => {
// // //         el.segment = index++;
// // //         el.category = this.utility.setCategory(el.average_engagement);
// // //         el.moodCategory = this.utility.setCategory(el.average_mood);
// // //         return el;
// // //       });
// // //       this.sessionDataMinutes = this.dashService.SecArrToMinuteArr(data.overallEngagement);
// // //     } else {
// // //       console.error('Data Not Available');
// // //     }
// // //   }
// // //
// // //   spline(cat: any): void {
// // //     this.router.navigate(['report/category-detail'], {queryParams: {catType: cat.category.toLowerCase()}, queryParamsHandling: 'merge'});
// // //   }
// // //
// // //   segmentWiseScore(selection: any): any { //  percentage calculation for segments (list below pie chart)
// // //     for (let i = 0; i < 4; i++) {
// // //       this.dashService.updateArr(i, selection, this);
// // //     }
// // //   }
// // //
// // //   studentListPanel(val: any): void {
// // //     this.dispStdList = val;
// // //   }
// // //
// // //   getCategoryVal(): any {
// // //     return this.categoryFilterVal;
// // //   }
// // //
// // //   individualSegmentScores(cat: any): void { // calculations done for selected segment
// // //     this.segSpecificData.name = [{name: cat.name + 'ENGAGEMENT'}, {name: cat.name + 'MOOD'}];
// // //     this.segSpecificData.categoryText = cat.name;
// // //     this.segSpecificData.categoryMetric = this.engOrMood === 0 ? 'ENGAGEMENT' : 'MOOD';
// // //     this.segSpecificData.category = cat.category === 'camOff' ? cat.category : cat.category;
// // //     this.segSpecificData.color = cat.color;
// // //     this.segSpecificData.iconClassName = cat.className;
// // //     this.segSpecificData[`percent`] = [];
// // //     this.segSpecificData[`participantsCount`] = [];
// // //     this.segSpecificData[`users`] = [];
// // //     this.segSpecificData[`moodPercent`] = [];
// // //     this.segSpecificData[`moodParticipantsCount`] = [];
// // //     this.segSpecificData[`moodUsers`] = [];
// // //     this.dispCatSpecificData = true;
// // //     this.dispStdList = false;
// // //
// // //     for (let i = 0; i < this.pieChartData.length; i++) {
// // //       this.segSpecificData[`percent`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][0].toFixed(2);
// // //       this.segSpecificData[`participantsCount`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][1].uuid.length;
// // //       this.segSpecificData[`users`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) => el.category === cat.category) : [];
// // //       this.segSpecificData[`moodPercent`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][3].toFixed(2);
// // //       this.segSpecificData[`moodParticipantsCount`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][2].uuid.length;
// // //       this.segSpecificData[`moodUsers`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) => el.moodCategory === cat.category) : [];
// // //     }
// // //   }
// // //
// // // //  topEngagement(array:any):any{
// // // //     return Math.max.apply(null, array);
// // // //  }
// // // //  leastEngagement(array:any):any{
// // // //     return Math.min.apply(null, array);
// // // //  }
// // // //  ages=[11, 54, 32, 92];
// // // //   maxAge=this.topEngagement(this.ages);
// // // //   minAge=this.leastEngagement(this.ages);
// // // //  arr1: any[] = [70,60,65,58,59,54,92,63,65];
// // // //  max:any = this.arr1[0];
// // // // for(let i=0; i< this.arr1.length;i++){
// // // //   if(this.arr1[i]>= this.max){
// // // //     this.max = this.arr1[i];
// // // //   }
// // // // }
// // // // console.log(this.max);
// // // //   }
// // // //  maxValue(){
// // // //   const max2 = this.students.reduce((op:any, item:any) => op = op > item.engagement ? op : item.engagement, 0);
// // // //   console.log('student',max2);
// // // //  }
// // // // randomData = [34, 56, 89, 12, 45]
// // // // randomData:any[]=[
// // // //   {engagement:99, name:'rrr'},
// // // //   {engagement:91, name:'eee'},
// // // //   {engagement:90, name:'ggg'},
// // // //   {engagement:92, name:'hhh'},
// // // //   {engagement:94, name:'jjj'},
// // // //   {engagement:93, name:'kkk'},
// // // //   {engagement:92, name:'lll'},
// // // // ]
// // // // sortData(){
// // // //   let topValues = this.randomData.sort((a,b)=> b-a).slice(0,3);
// // // //   console.log(topValues);
// // // // }
// // //
// // //
// // //   sortData(inputArray: Array<any>): any {
// // //     debugger
// // //     inputArray = inputArray.sort((a: any, b: any) =>
// // //       a.averageEngagement < b.averageEngagement ? 1 : a.averageEngagement > b.averageEngagement ? -1 : 0
// // //     );
// // //     console.log('sorted', inputArray);
// // //     if (inputArray.length < 10) {
// // //       this.top5Engaging.push(inputArray[0]);
// // //     }
// // //     if (inputArray.length > 10) {
// // //       for (let i = 0; i < 3; i++) {
// // //         this.top5Engaging.push(inputArray[i]);
// // //       }
// // //     }
// // //   }
// // //   sortData1(inputArray: Array<any>): any {
// // //     const inputArray1 = inputArray.sort((a: any, b: any) =>
// // //       a.averageEngagement < b.averageEngagement ? -1 : a.averageEngagement > b.averageEngagement ? 1 : 0
// // //     );
// // //     console.log('sorted', inputArray);
// // //     if (inputArray1.length < 10) {
// // //       this.bottom5Engaging.push(inputArray[0]);
// // //     }
// // //     if (inputArray1.length > 10) {
// // //       for (let i = 0; i < 3; i++) {
// // //         this.bottom5Engaging.push(inputArray[i]);
// // //       }
// // //     }
// // //   }
// // //
// // //
// // // }
// // import {DatePipe} from '@angular/common';
// // import {ChangeDetectorRef, Component, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
// // import {ActivatedRoute, Router} from '@angular/router';
// // import {ApiService} from 'src/app/modules/shared/services/api.service';
// // import {ScriptLoadService} from 'src/app/modules/shared/services/script-load.service';
// // import {SocketService} from 'src/app/modules/shared/services/socket.service';
// // import {UtilityService} from 'src/app/modules/shared/services/utility.service';
// // import {BehaviourSubjectsService} from 'src/app/services/behaviour-subjects.service';
// // import {DashboardService} from '../dashboard/dashboard.service';
// // import {jsPDF} from 'jspdf';
// // import html2canvas from 'html2canvas';
// // import { HttpClient } from '@angular/common/http';
// // import { L } from '@angular/cdk/keycodes';
// //
// // // import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// //
// // @Component({
// //   selector: 'app-spline',
// //   templateUrl: './spline.component.html',
// //   styleUrls: ['./spline.component.scss']
// // })
// // export class SplineComponent implements OnInit, OnChanges {
// //   studentAttendance: any;
// //   speakingScore: any;
// //   roomId: any;
// //   li: any;
// //   lis: any=[];
// //   topStudent:Array<any> = [];
// //   bottomStudent : Array<any> = [];
// //   linkEnabled: boolean = JSON.parse(localStorage.getItem('userPlanDetails') || '{}').postMeetingAnalytics;
// //   minuteToggle: any = true;
// //   sessionDataMinutes: any = [];
// //   sessionDataSeconds: any = [];
// //   pieChartData: any;
// //   engOrMood: any;
// //   percentArr: any = [];
// //   segUsersArr: any = [];
// //   moodpercentArr: any = [];
// //   moodsegUsersArr: any = [];
// //   selection: any;
// //   duration: any = 0;
// //   param: any;
// //   callDetails: any = JSON.parse(localStorage.getItem('callDetails') || '{}');
// //   segmentData: any = [];
// //   category: any;
// //   students: any = [];
// //   dispStdList: any = false;
// //   headingDuration: any;
// //   dispCatSpecificData: any = false;
// //   studentList: any;
// //   // arr1:any =[];
// //
// //
// //   segments: any[] = [
// //     {
// //       name: 'HIGH ',
// //       eng: 'ENGAGEMENT',
// //       mood: 'MOOD',
// //       indivSegKeyMap: 'hi_percentage',
// //       category: 'High',
// //       valMin: 80,
// //       valMax: 1000,
// //       className: 'title-success16-400',
// //       color: '#1FA000'
// //     },
// //     {
// //       name: 'MID ',
// //       eng: 'ENGAGEMENT',
// //       mood: 'MOOD',
// //       indivSegKeyMap: 'med_percentage',
// //       category: 'Medium',
// //       valMin: 40,
// //       valMax: 80,
// //       className: 'title-warning16-400',
// //       color: '#D5AD2A'
// //     },
// //     {
// //       name: 'LOW ',
// //       eng: 'ENGAGEMENT',
// //       mood: 'MOOD',
// //       indivSegKeyMap: 'low_percentage',
// //       category: 'Low',
// //       valMin: 0,
// //       valMax: 40,
// //       className: 'title-danger16-400',
// //       color: '#BA0E15'
// //     },
// //     {
// //       name: 'CAMERA OFF ',
// //       eng: '',
// //       mood: '',
// //       indivSegKeyMap: 'camoff_percentage',
// //       category: 'camOff',
// //       valMin: false,
// //       valMax: false,
// //       className: 'title-gray16-400',
// //       color: '#262525'
// //     }];
// //
// //   segmentDuration: any[] = [
// //     {name: '1st hour', value: 1, selected: true},
// //     // {name: '2nd hour', value: 2, selected: false}
// //   ];
// //   metricType: any = {
// //     category: '',
// //     segmentName: '',
// //     engType: 'Session',
// //     percentArr: [],
// //   };
// //   categoryFilterVal: any = 'category';
// //
// //   segSpecificData: any = {
// //     name: [],
// //     percent: [],
// //     participantsCount: [],
// //     users: [],
// //     moodPercent: [],
// //     moodParticipantsCount: [],
// //     moodUsers: [],
// //     categoryText: '',
// //     categoryMetric: '',
// //     category: '',
// //     color: '',
// //     iconClassName: '',
// //   };
// //
// //   engType: any;
// //   metric: any;
// //   attendees: any = 0;
// //   userDetails: any;
// //   room: any;
// //   reportData: any;
// //   message: any;
// //
// //
// //   constructor(private router: Router,
// //               private date: DatePipe,
// //               private as: ApiService,
// //               private ss: SocketService,
// //               private route: ActivatedRoute,
// //               private sl: ScriptLoadService,
// //               public cdRef: ChangeDetectorRef,
// //               private bhvSub: BehaviourSubjectsService,
// //               private dashService: DashboardService,
// //               private zone: NgZone,
// //               private utility: UtilityService,
// //               private http: HttpClient
// //   ) {
// //     this.route.queryParams.subscribe(next => {
// //       if (next) {
// //         this.roomId = next.roomid;
// //         this.getRoom(next.roomid);
// //       }
// //     });
// //   }
// //
// //   getRoom(roomid: any): void {
// //     this.as.getApi('getInviteRoom?roomid=' + roomid).subscribe(next => {
// //       if (next) {
// //         this.room = next.response;
// //       }
// //     });
// //   }
// //
// //
// //   public convertToPDF() {
// //     let element = document.getElementById('report');
// //     console.log('fhgfvh',element);
// //     html2canvas(element).then(canvas => {
// //
// //       const contentDataURL = canvas.toDataURL('image/png');
// //       const pdf = new jsPDF('p', 'mm', 'a4');
// //       const width = 210;
// //       const height = 297;
// //       pdf.addImage(contentDataURL, 0, 0, width, height);
// //       pdf.save('output.pdf');
// //       // console.log('downloaded');
// //     });
// //   }
// //
// //   ngOnChanges(changes: SimpleChanges): void {
// //     console.log('test', changes);
// //   }
// //
// //   ngOnInit(): void {
// //
// //     this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
// //
// //     this.userDetails.email;
// //     console.log(this.userDetails.name);
// //
// //     this.reportData = JSON.parse(localStorage.getItem('reportData'));
// //     this.reportData.report.averageEngagement;
// //     this.reportData.report.averageMood;
// //     console.log(this.reportData.report.averageEngagement);
// //     console.log('mod data', this.reportData.report.averageMood);
// //
// //     this.callDetails = JSON.parse(localStorage.getItem('callDetails'));
// //     this.callDetails.time;
// //
// //     this.http.get(`https://www.monetlive.com/many/api/report-pdf?roomid=${this.roomId}`)
// //       .subscribe(Response => {
// //         console.log('attendance',Response)
// //         this.lis = Response;
// //         this.studentAttendance = this.lis.data.attendance;
// //         console.log('Attendance', this.studentAttendance);
// //
// //         this.li = this.lis.data.students;
// //         console.log('studentData', this.lis.data.students);
// //         this.sortData(this.lis.data.students);
// //         this.sortData1(this.lis.data.students);
// //
// //         this.speakingScore = this.lis.data.speakingScore;
// //         if(!this.speakingScore){
// //           console.log(0);
// //           this.speakingScore = 0;
// //         }else{
// //           console.log('Speaking', this.speakingScore);
// //           this.speakingScore;
// //         }
// //       });
// //
// //     this.route.queryParams.subscribe((next: any) => {
// //       if (next) {
// //         this.param = next;
// //         this.getDashboardData(JSON.parse(localStorage.getItem('reportData') || '{}'));
// //         if (JSON.parse(localStorage.getItem('avg-eng-res') || '[]') && this.segmentData.length === 0) {
// //           this.createSegment(JSON.parse(localStorage.getItem('avg-eng-res') || '[]'));
// //         }
// //       }
// //     });
// //     this.bhvSub.engOrMood$.subscribe((data: any) => {
// //       this.engOrMood = data;
// //       this.categoryFilterVal = data ? 'moodCategory' : 'category';
// //       this.metricType.engType = data === 0 ? 'Session' : 'Mood';
// //       this.metricType.category = data === 0 ? 'segCategory' : 'segMoodCategory';
// //       this.metricType.segmentName = data === 0 ? 'ENGAGEMENT' : 'MOOD';
// //     });
// //
// //
// //   }
// //
// //   createSegment(data: any): void {
// //     data.forEach((el: any) => {
// //       el.stdCallDuration = this.utility.convertDate(el.engagement_avg, 60);
// //     });
// //
// //     if (this.callDetails) {
// //       this.duration = this.utility.calculateDuration(data).duration;
// //       if (this.duration > 3600) {
// //         this.segmentDuration.push({name: '2nd hour', value: 2, selected: false});
// //       }
// //       this.duration = Math.round(this.duration / 4);
// //       for (let i = 1; i <= 4; i++) {
// //         this.headingDuration = this.utility.convertDate(this.duration * (1), this.callDetails.duration);
// //         const seg: any = {
// //           segment: i,
// //           data: [],
// //           metricAverage: {high: 0, medium: 0, low: 0, camOff: 0},
// //           moodAverage: {high: 0, medium: 0, low: 0, camOff: 0},
// //           catSpecificData: {high: [], medium: [], low: [], camOff: []},
// //           metricCount: 0,
// //           duration: this.utility.convertDate(this.duration * (i - 1), this.callDetails.duration) + ' - ' +
// //             this.utility.convertDate(this.duration * i, this.callDetails.duration)
// //         };
// //         const arr = JSON.parse(JSON.stringify(data));
// //         if (i === 1) {
// //           this.callDetails.engagementAvg = 0;
// //         }
// //         arr.map((std: any) => { // student array
// //           if (i === 1) {
// //             this.callDetails.engagementAvg += (std.engagement_avg !== null ? std.engagement_avg : 0);
// //           }
// //           std.segEngagement = 0;
// //           std.segMood = 0;
// //           std.category = this.utility.setCategory(std.engagement);
// //           std.engagement_data = std.session_data.filter((metric: any) => {
// //             if (metric.segment >= (this.duration * (i - 1)) && metric.segment < (this.duration * i)) {
// //               metric.category = this.utility.setCategory(metric.engagement);
// //               metric.moodCategory = this.utility.setCategory(metric.mood);
// //               std.segMood += metric.mood !== null ? metric.mood : 0;
// //               std.segEngagement += metric.engagement !== null ? metric.engagement : 0;
// //               return metric;
// //             }
// //           });
// //           std.segMood = std.segMood ? Math.round(std.segMood / std.engagement_data.length) : null;
// //           std.segEngagement = std.segEngagement ? Math.round(std.segEngagement / std.engagement_data.length) : null;
// //           std.segCategory = this.utility.setCategory(std.engagement_avg);
// //           seg.metricCount += std.session_data.length;
// //           seg.data.push(std);
// //           return std;
// //         });
// //         for (let y = 0; i === 1 && y < 4; y++) {
// //           seg.catSpecificData[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segCategory === `${this.segments[y].category}`);
// //           seg.metricAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segCategory === `${this.segments[y].category}`).length;
// //           seg.moodAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segMoodCategory === `${this.segments[y].category}`).length;
// //         }
// //         this.zone.run(() => this.segmentData.push(seg));
// //       }
// //       console.log('Segment Data :', this.segmentData);
// //       this.callDetails.engagementAvg = Math.round(this.callDetails.engagementAvg / data.length);
// //     }
// //   }
// //
// //   getDashboardData(data: any): void {
// //     let index = 1;
// //     if (data && data?.pieData.length && data?.overallEngagement.length) {
// //       this.pieChartData = data.pieData.map((el: any) => {
// //         el.UAE.map((user: any) => {
// //           user.average = user.average.toFixed(2);
// //           user.average_mood = user.average_mood.toFixed(2);
// //         });
// //         return el;
// //       });
// //       this.sessionDataSeconds = data.overallEngagement.map((el: any) => {
// //         el.segment = index++;
// //         el.category = this.utility.setCategory(el.average_engagement);
// //         el.moodCategory = this.utility.setCategory(el.average_mood);
// //         return el;
// //       });
// //       this.sessionDataMinutes = this.dashService.SecArrToMinuteArr(data.overallEngagement);
// //     } else {
// //       console.error('Data Not Available');
// //     }
// //   }
// //
// //   spline(cat: any): void {
// //     this.router.navigate(['report/category-detail'], {queryParams: {catType: cat.category.toLowerCase()}, queryParamsHandling: 'merge'});
// //   }
// //
// //   segmentWiseScore(selection: any): any { //  percentage calculation for segments (list below pie chart)
// //     for (let i = 0; i < 4; i++) {
// //       this.dashService.updateArr(i, selection, this);
// //     }
// //   }
// //
// //   studentListPanel(val: any): void {
// //     this.dispStdList = val;
// //   }
// //
// //   getCategoryVal(): any {
// //     return this.categoryFilterVal;
// //   }
// //
// //   individualSegmentScores(cat: any): void { // calculations done for selected segment
// //     this.segSpecificData.name = [{name: cat.name + 'ENGAGEMENT'}, {name: cat.name + 'MOOD'}];
// //     this.segSpecificData.categoryText = cat.name;
// //     this.segSpecificData.categoryMetric = this.engOrMood === 0 ? 'ENGAGEMENT' : 'MOOD';
// //     this.segSpecificData.category = cat.category === 'camOff' ? cat.category : cat.category;
// //     this.segSpecificData.color = cat.color;
// //     this.segSpecificData.iconClassName = cat.className;
// //     this.segSpecificData[`percent`] = [];
// //     this.segSpecificData[`participantsCount`] = [];
// //     this.segSpecificData[`users`] = [];
// //     this.segSpecificData[`moodPercent`] = [];
// //     this.segSpecificData[`moodParticipantsCount`] = [];
// //     this.segSpecificData[`moodUsers`] = [];
// //     this.dispCatSpecificData = true;
// //     this.dispStdList = false;
// //
// //     for (let i = 0; i < this.pieChartData.length; i++) {
// //       this.segSpecificData[`percent`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][0].toFixed(2);
// //       this.segSpecificData[`participantsCount`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][1].uuid.length;
// //       this.segSpecificData[`users`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) => el.category === cat.category) : [];
// //       this.segSpecificData[`moodPercent`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][3].toFixed(2);
// //       this.segSpecificData[`moodParticipantsCount`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][2].uuid.length;
// //       this.segSpecificData[`moodUsers`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) => el.moodCategory === cat.category) : [];
// //     }
// //   }
// //
// //   sortData(inputArray: Array<any>): any {
// //     inputArray = inputArray.sort((a: any, b: any) =>
// //       a.averageEngagement < b.averageEngagement ? 1 : a.averageEngagement > b.averageEngagement ? -1 : 0
// //     );
// //     console.log('sorted', inputArray);
// //
// //     if (inputArray.length < 10) {
// //       this.topStudent.push(inputArray[0]);
// //       console.log('top1', this.topStudent);
// //
// //     }
// //     if (inputArray.length > 10) {
// //       for (let i = 0; i < 3; i++) {
// //         this.topStudent.push(inputArray[i]);
// //         console.log('top3', this.topStudent);
// //       }
// //     }
// //   }
// //   sortData1(inputArray: Array<any>): any {
// //     const inputArray1 = inputArray.sort((a: any, b: any) =>
// //       a.averageEngagement < b.averageEngagement ? -1 : a.averageEngagement > b.averageEngagement ? 1 : 0
// //     );
// //     console.log('sorted Bottom', inputArray1);
// //
// //     if (inputArray1.length < 10) {
// //       this.bottomStudent.push(inputArray1[0]);
// //       console.log('bottom1', this.bottomStudent);
// //     }
// //     if (inputArray1.length > 10) {
// //       for (let i = 0; i < 3; i++) {
// //         this.bottomStudent.push(inputArray1[i]);
// //         console.log('bottom3',  this.bottomStudent);
// //       }
// //     }
// //   }
// //
// // }
// //
// //
// import {DatePipe} from '@angular/common';
// import {ChangeDetectorRef, Component, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
// import {ActivatedRoute, Router} from '@angular/router';
// import {ApiService} from 'src/app/modules/shared/services/api.service';
// import {ScriptLoadService} from 'src/app/modules/shared/services/script-load.service';
// import {SocketService} from 'src/app/modules/shared/services/socket.service';
// import {UtilityService} from 'src/app/modules/shared/services/utility.service';
// import {BehaviourSubjectsService} from 'src/app/services/behaviour-subjects.service';
// import {DashboardService} from '../dashboard/dashboard.service';
// import {jsPDF} from 'jspdf';
// import html2canvas from 'html2canvas';
// import { HttpClient } from '@angular/common/http';
// import { L } from '@angular/cdk/keycodes';
// import { ReportServiceService } from '../../report-service.service';
// import { Observable } from 'rxjs';
//
// // import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//
// @Component({
//   selector: 'app-spline',
//   templateUrl: './spline.component.html',
//   styleUrls: ['./spline.component.scss']
// })
// export class SplineComponent implements OnInit, OnChanges {
//   readonly progress : Observable<number>;
//   status: boolean;
//   studentAttendance: any;
//   speakingScore: any;
//   roomId: any;
//   li: any;
//   lis: any=[];
//   topStudent:Array<any> = [];
//   bottomStudent : Array<any> = [];
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
//   dispCatSpecificData: any = false;
//   studentList: any;
//
//
//
//   segments: any[] = [
//     {
//       name: 'HIGH ',
//       eng: 'ENGAGEMENT',
//       mood: 'MOOD',
//       indivSegKeyMap: 'hi_percentage',
//       category: 'High',
//       valMin: 80,
//       valMax: 1000,
//       className: 'title-success16-400',
//       color: '#1FA000'
//     },
//     {
//       name: 'MID ',
//       eng: 'ENGAGEMENT',
//       mood: 'MOOD',
//       indivSegKeyMap: 'med_percentage',
//       category: 'Medium',
//       valMin: 40,
//       valMax: 80,
//       className: 'title-warning16-400',
//       color: '#D5AD2A'
//     },
//     {
//       name: 'LOW ',
//       eng: 'ENGAGEMENT',
//       mood: 'MOOD',
//       indivSegKeyMap: 'low_percentage',
//       category: 'Low',
//       valMin: 0,
//       valMax: 40,
//       className: 'title-danger16-400',
//       color: '#BA0E15'
//     },
//     {
//       name: 'CAMERA OFF ',
//       eng: '',
//       mood: '',
//       indivSegKeyMap: 'camoff_percentage',
//       category: 'camOff',
//       valMin: false,
//       valMax: false,
//       className: 'title-gray16-400',
//       color: '#262525'
//     }];
//
//   segmentDuration: any[] = [
//     {name: '1st hour', value: 1, selected: true},
//     // {name: '2nd hour', value: 2, selected: false}
//   ];
//   metricType: any = {
//     category: '',
//     segmentName: '',
//     engType: 'Session',
//     percentArr: [],
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
//   engType: any;
//   metric: any;
//   attendees: any = 0;
//   userDetails: any;
//   room: any;
//   reportData: any;
//   message: any;
//
//
//   constructor(private router: Router,
//               private date: DatePipe,
//               private as: ApiService,
//               private ss: SocketService,
//               private route: ActivatedRoute,
//               private sl: ScriptLoadService,
//               public cdRef: ChangeDetectorRef,
//               private bhvSub: BehaviourSubjectsService,
//               private dashService: DashboardService,
//               private zone: NgZone,
//               private utility: UtilityService,
//               private http: HttpClient,
//               private repo: ReportServiceService
//
//   ) {
//     this.progress = this.emulateProgress();
//     this.route.queryParams.subscribe(next => {
//       if (next) {
//         this.roomId = next.roomid;
//         this.getRoom(next.roomid);
//       }
//     });
//   }
//   getRoom(roomid: any): void {
//     this.as.getApi('getInviteRoom?roomid=' + roomid).subscribe(next => {
//       if (next) {
//         this.room = next.response;
//       }
//     });
//
//   }
//
//
//   public convertToPDF() {
//     html2canvas(document.getElementById('report')!, {backgroundColor: '#000'}).then(canvas => {
//       const contentDataURL = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const width = 210;
//       const height = 297;
//       pdf.addImage(contentDataURL, 'PNG', 0,0, width, height);
//       pdf.save('output.pdf');
//       // console.log('downloaded');
//     });
//   }
//
//   ngOnChanges(changes: SimpleChanges): void {
//     console.log('test', changes);
//   }
//
//   ngOnInit(): void {
//
//     this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
//
//     this.userDetails.email;
//     console.log(this.userDetails.name);
//
//     this.reportData = JSON.parse(localStorage.getItem('reportData'));
//     this.reportData.report.averageEngagement;
//     this.reportData.report.averageMood;
//     console.log(this.reportData.report.averageEngagement);
//     console.log('mod data', this.reportData.report.averageMood);
//
//     this.callDetails = JSON.parse(localStorage.getItem('callDetails'));
//     this.callDetails.time;
//
//     this.http.get(`https://www.monetlive.com/many/api/report-pdf?roomid=${this.roomId}`)
//       .subscribe(Response => {
//         console.log('attendance',Response)
//         this.lis = Response;
//         this.studentAttendance = this.lis.data.attendance;
//         console.log('Attendance', this.studentAttendance);
//
//         this.li = this.lis.data.students;
//         console.log('studentData', this.lis.data.students);
//         this.sortData(this.lis.data.students);
//         this.sortData1(this.lis.data.students);
//
//         this.speakingScore = this.lis.data.speakingScore;
//         if(!this.speakingScore){
//           console.log(0);
//           this.speakingScore = 0;
//         }else{
//           console.log('Speaking', this.speakingScore);
//           this.speakingScore;
//         }
//       });
//
//     this.repo._dataSource.subscribe((data: boolean) => {
//
//       this.status = data
//       console.log(data);
//
//     })
//
//     this.route.queryParams.subscribe((next: any) => {
//       if (next) {
//         this.param = next;
//         this.getDashboardData(JSON.parse(localStorage.getItem('reportData') || '{}'));
//         if (JSON.parse(localStorage.getItem('avg-eng-res') || '[]') && this.segmentData.length === 0) {
//           this.createSegment(JSON.parse(localStorage.getItem('avg-eng-res') || '[]'));
//         }
//       }
//     });
//
//     this.bhvSub.engOrMood$.subscribe((data: any) => {
//       this.engOrMood = data;
//       this.categoryFilterVal = data ? 'moodCategory' : 'category';
//       this.metricType.engType = data === 0 ? 'Session' : 'Mood';
//       this.metricType.category = data === 0 ? 'segCategory' : 'segMoodCategory';
//       this.metricType.segmentName = data === 0 ? 'ENGAGEMENT' : 'MOOD';
//     });
//
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
//         this.headingDuration = this.utility.convertDate(this.duration * (1), this.callDetails.duration);
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
//         arr.map((std: any) => { // student array
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
//           seg.catSpecificData[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segCategory === `${this.segments[y].category}`);
//           seg.metricAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segCategory === `${this.segments[y].category}`).length;
//           seg.moodAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segMoodCategory === `${this.segments[y].category}`).length;
//         }
//         this.zone.run(() => this.segmentData.push(seg));
//       }
//       console.log('Segment Data :', this.segmentData);
//       this.callDetails.engagementAvg = Math.round(this.callDetails.engagementAvg / data.length);
//     }
//   }
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
//     } else {
//       console.error('Data Not Available');
//     }
//   }
//
//   spline(cat: any): void {
//     this.router.navigate(['report/category-detail'], {queryParams: {catType: cat.category.toLowerCase()}, queryParamsHandling: 'merge'});
//   }
//
//   segmentWiseScore(selection: any): any { //  percentage calculation for segments (list below pie chart)
//     for (let i = 0; i < 4; i++) {
//       this.dashService.updateArr(i, selection, this);
//     }
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
//     this.segSpecificData.name = [{name: cat.name + 'ENGAGEMENT'}, {name: cat.name + 'MOOD'}];
//     this.segSpecificData.categoryText = cat.name;
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
//       this.segSpecificData[`users`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) => el.category === cat.category) : [];
//       this.segSpecificData[`moodPercent`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][3].toFixed(2);
//       this.segSpecificData[`moodParticipantsCount`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][2].uuid.length;
//       this.segSpecificData[`moodUsers`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) => el.moodCategory === cat.category) : [];
//     }
//   }
//
//   sortData(inputArray: Array<any>): any {
//     inputArray = inputArray.sort((a: any, b: any) =>
//       a.averageEngagement < b.averageEngagement ? 1 : a.averageEngagement > b.averageEngagement ? -1 : 0
//     );
//     console.log('sorted', inputArray);
//
//     if (inputArray.length < 10) {
//       this.topStudent.push(inputArray[0]);
//       console.log('top1', this.topStudent);
//
//     }
//     if (inputArray.length > 10) {
//       for (let i = 0; i < 3; i++) {
//         this.topStudent.push(inputArray[i]);
//         console.log('top3', this.topStudent);
//       }
//     }
//   }
//   sortData1(inputArray: Array<any>): any {
//     const inputArray1 = inputArray.sort((a: any, b: any) =>
//       a.averageEngagement < b.averageEngagement ? -1 : a.averageEngagement > b.averageEngagement ? 1 : 0
//     );
//     console.log('sorted Bottom', inputArray1);
//
//     if (inputArray1.length < 10) {
//       this.bottomStudent.push(inputArray1[0]);
//       console.log('bottom1', this.bottomStudent);
//     }
//     if (inputArray1.length > 10) {
//       for (let i = 0; i < 3; i++) {
//         this.bottomStudent.push(inputArray1[i]);
//         console.log('bottom3',  this.bottomStudent);
//       }
//     }
//   }
//
//   emulateProgress(){
//     return new Observable<number>(observer=>{
//       let val = 0;
//       const interval = setInterval(()=>{
//         if (val < 100){
//           val ++;
//         }else{
//           val = 0;
//         }
//         observer.next(val);
//       }, 10);
//       return()=>{
//         clearInterval(interval);
//       };
//     });
//   }
//   closeDialog(event: any){
//     this.router.navigateByUrl(`report/dashboard?roomid=${this.roomId}`).then(data =>{
//       // console.log('Route Successfull');
//
//     }).catch(error =>{
//       console.error(error);
//     })
//   }
// }
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/modules/shared/services/api.service';
import { ScriptLoadService } from 'src/app/modules/shared/services/script-load.service';
import { SocketService } from 'src/app/modules/shared/services/socket.service';
import { UtilityService } from 'src/app/modules/shared/services/utility.service';
import { BehaviourSubjectsService } from 'src/app/services/behaviour-subjects.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { L } from '@angular/cdk/keycodes';
import { ReportServiceService } from '../../report-service.service';
import { Observable } from 'rxjs';

// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//
// @Component({
//   selector: 'app-spline',
//   templateUrl: './spline.component.html',
//   styleUrls: ['./spline.component.scss']
// })
// export class SplineComponent implements OnInit, OnChanges {
//   readonly progress : Observable<number>;
//   status: boolean;
//   studentAttendance: any;
//   speakingScore: any;
//   roomId: any;
//   li: any;
//   lis: any=[];
//   topStudent:Array<any> = [];
//   bottomStudent : Array<any> = [];
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
//   dispCatSpecificData: any = false;
//   studentList: any;
//
//
//
//   segments: any[] = [
//     {
//       name: 'HIGH ',
//       eng: 'ENGAGEMENT',
//       mood: 'MOOD',
//       indivSegKeyMap: 'hi_percentage',
//       category: 'High',
//       valMin: 80,
//       valMax: 1000,
//       className: 'title-success16-400',
//       color: '#1FA000'
//     },
//     {
//       name: 'MID ',
//       eng: 'ENGAGEMENT',
//       mood: 'MOOD',
//       indivSegKeyMap: 'med_percentage',
//       category: 'Medium',
//       valMin: 40,
//       valMax: 80,
//       className: 'title-warning16-400',
//       color: '#D5AD2A'
//     },
//     {
//       name: 'LOW ',
//       eng: 'ENGAGEMENT',
//       mood: 'MOOD',
//       indivSegKeyMap: 'low_percentage',
//       category: 'Low',
//       valMin: 0,
//       valMax: 40,
//       className: 'title-danger16-400',
//       color: '#BA0E15'
//     },
//     {
//       name: 'CAMERA OFF ',
//       eng: '',
//       mood: '',
//       indivSegKeyMap: 'camoff_percentage',
//       category: 'camOff',
//       valMin: false,
//       valMax: false,
//       className: 'title-gray16-400',
//       color: '#262525'
//     }];
//
//   segmentDuration: any[] = [
//     {name: '1st hour', value: 1, selected: true},
//     // {name: '2nd hour', value: 2, selected: false}
//   ];
//   metricType: any = {
//     category: '',
//     segmentName: '',
//     engType: 'Session',
//     percentArr: [],
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
//   engType: any;
//   metric: any;
//   attendees: any = 0;
//   userDetails: any;
//   room: any;
//   reportData: any;
//   message: any;
//
//
//   constructor(private router: Router,
//               private date: DatePipe,
//               private as: ApiService,
//               private ss: SocketService,
//               private route: ActivatedRoute,
//               private sl: ScriptLoadService,
//               public cdRef: ChangeDetectorRef,
//               private bhvSub: BehaviourSubjectsService,
//               private dashService: DashboardService,
//               private zone: NgZone,
//               private utility: UtilityService,
//               private http: HttpClient,
//               private repo: ReportServiceService
//
//   ) {
//     this.progress = this.emulateProgress();
//     this.route.queryParams.subscribe(next => {
//       if (next) {
//         this.roomId = next.roomid;
//         this.getRoom(next.roomid);
//       }
//     });
//   }
//   getRoom(roomid: any): void {
//     this.as.getApi('getInviteRoom?roomid=' + roomid).subscribe(next => {
//       if (next) {
//         this.room = next.response;
//       }
//     });
//
//   }
//
//
//   public convertToPDF() {
//     html2canvas(document.getElementById('report')!, {backgroundColor: '#000'}).then(canvas => {
//       const contentDataURL = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const width = 210;
//       const height = 297;
//       pdf.addImage(contentDataURL, 'PNG', 0,0, width, height);
//       pdf.save('output.pdf');
//       // console.log('downloaded');
//     });
//   }
//
//   ngOnChanges(changes: SimpleChanges): void {
//     console.log('test', changes);
//   }
//
//   ngOnInit(): void {
//
//     this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
//
//     this.userDetails.email;
//     console.log(this.userDetails.name);
//
//     this.reportData = JSON.parse(localStorage.getItem('reportData'));
//     this.reportData.report.averageEngagement;
//     this.reportData.report.averageMood;
//     console.log(this.reportData.report.averageEngagement);
//     console.log('mod data', this.reportData.report.averageMood);
//
//     this.callDetails = JSON.parse(localStorage.getItem('callDetails'));
//     this.callDetails.time;
//
//     this.http.get(`https://www.monetlive.com/many/api/report-pdf?roomid=${this.roomId}`)
//       .subscribe(Response => {
//         if(Response){
//           hideloader();
//         }
//         console.log('attendance',Response)
//         this.lis = Response;
//         this.studentAttendance = this.lis.data.attendance;
//         console.log('Attendance', this.studentAttendance);
//
//         this.li = this.lis.data.students;
//         console.log('studentData', this.lis.data.students);
//         this.sortData(this.lis.data.students);
//         this.sortData1(this.lis.data.students);
//
//         this.speakingScore = this.lis.data.speakingScore;
//         if(!this.speakingScore){
//           console.log(0);
//           this.speakingScore = 0;
//         }else{
//           console.log('Speaking', this.speakingScore);
//           this.speakingScore;
//         }
//       });
//     function  hideloader() {
//       document.getElementById('loading')
//         .style.display = 'none';
//     }
//
//     this.repo._dataSource.subscribe((data: boolean) => {
//
//       this.status = data
//       console.log(data);
//
//     })
//
//     this.route.queryParams.subscribe((next: any) => {
//       if (next) {
//         this.param = next;
//         this.getDashboardData(JSON.parse(localStorage.getItem('reportData') || '{}'));
//         if (JSON.parse(localStorage.getItem('avg-eng-res') || '[]') && this.segmentData.length === 0) {
//           this.createSegment(JSON.parse(localStorage.getItem('avg-eng-res') || '[]'));
//         }
//       }
//     });
//
//     this.bhvSub.engOrMood$.subscribe((data: any) => {
//       this.engOrMood = data;
//       this.categoryFilterVal = data ? 'moodCategory' : 'category';
//       this.metricType.engType = data === 0 ? 'Session' : 'Mood';
//       this.metricType.category = data === 0 ? 'segCategory' : 'segMoodCategory';
//       this.metricType.segmentName = data === 0 ? 'ENGAGEMENT' : 'MOOD';
//     });
//
//   }
//
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
//         this.headingDuration = this.utility.convertDate(this.duration * (1), this.callDetails.duration);
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
//         arr.map((std: any) => { // student array
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
//           seg.catSpecificData[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segCategory === `${this.segments[y].category}`);
//           seg.metricAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segCategory === `${this.segments[y].category}`).length;
//           seg.moodAverage[`${this.segments[y].category.toLowerCase()}`] = seg.data.filter((std: any) => std.segMoodCategory === `${this.segments[y].category}`).length;
//         }
//         this.zone.run(() => this.segmentData.push(seg));
//       }
//       console.log('Segment Data :', this.segmentData);
//       this.callDetails.engagementAvg = Math.round(this.callDetails.engagementAvg / data.length);
//     }
//   }
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
//     } else {
//       console.error('Data Not Available');
//     }
//   }
//
//   spline(cat: any): void {
//     this.router.navigate(['report/category-detail'], {queryParams: {catType: cat.category.toLowerCase()}, queryParamsHandling: 'merge'});
//   }
//
//   segmentWiseScore(selection: any): any { //  percentage calculation for segments (list below pie chart)
//     for (let i = 0; i < 4; i++) {
//       this.dashService.updateArr(i, selection, this);
//     }
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
//     this.segSpecificData.name = [{name: cat.name + 'ENGAGEMENT'}, {name: cat.name + 'MOOD'}];
//     this.segSpecificData.categoryText = cat.name;
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
//       this.segSpecificData[`users`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) => el.category === cat.category) : [];
//       this.segSpecificData[`moodPercent`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][3].toFixed(2);
//       this.segSpecificData[`moodParticipantsCount`][i] = this.pieChartData[i][`${cat.indivSegKeyMap}`][2].uuid.length;
//       this.segSpecificData[`moodUsers`][i] = cat.name !== 'CAMERA OFF ' ? this.pieChartData[i].UAE.filter((el: any) => el.moodCategory === cat.category) : [];
//     }
//   }
//
//   sortData(inputArray: Array<any>): any {
//     inputArray = inputArray.sort((a: any, b: any) =>
//       a.averageEngagement < b.averageEngagement ? 1 : a.averageEngagement > b.averageEngagement ? -1 : 0
//     );
//     console.log('sorted', inputArray);
//     if(inputArray.length === 1 || inputArray.length < 10){
//       this.topStudent.push(inputArray[0]);
//       console.log('only one ', this.topStudent);
//     }
//     // if (inputArray.length < 10) {
//     //   this.topStudent.push(inputArray[0]);
//     //  console.log('top1', this.topStudent);
//
//     // }
//     if (inputArray.length > 10) {
//       for (let i = 0; i < 3; i++) {
//         this.topStudent.push(inputArray[i]);
//         console.log('top3', this.topStudent);
//       }
//     }
//   }
//   sortData1(inputArray: Array<any>): any {
//     const inputArray1 = inputArray.sort((a: any, b: any) =>
//       a.averageEngagement < b.averageEngagement ? -1 : a.averageEngagement > b.averageEngagement ? 1 : 0
//     );
//     console.log('sorted Bottom', inputArray1);
//     if(inputArray.length === 1 ){
//       console.log('only one ', this.bottomStudent);
//       return 0
//
//     }
//     if (inputArray1.length < 10) {
//       this.bottomStudent.push(inputArray1[0]);
//       console.log('bottom1', this.bottomStudent);
//     }
//     if (inputArray1.length > 10) {
//       for (let i = 0; i < 3; i++) {
//         this.bottomStudent.push(inputArray1[i]);
//         console.log('bottom3',  this.bottomStudent);
//       }
//     }
//   }
//
//   emulateProgress(){
//     return new Observable<number>(observer=>{
//       let val = 0;
//       const interval = setInterval(()=>{
//         if (val < 100){
//           val ++;
//         }else{
//           val = 0;
//         }
//         observer.next(val);
//       }, 10);
//       return()=>{
//         clearInterval(interval);
//       };
//     });
//   }
//   closeDialog(event: any){
//     this.router.navigateByUrl(`report/dashboard?roomid=${this.roomId}`).then(data =>{
//       // console.log('Route Successfull');
//
//     }).catch(error =>{
//       console.error(error);
//     })
//   }
//
// }





// import {DatePipe} from '@angular/common';
// import {ChangeDetectorRef, Component, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
// import {ActivatedRoute, Router} from '@angular/router';
// import {ApiService} from 'src/app/modules/shared/services/api.service';
// import {ScriptLoadService} from 'src/app/modules/shared/services/script-load.service';
// import {SocketService} from 'src/app/modules/shared/services/socket.service';
// import {UtilityService} from 'src/app/modules/shared/services/utility.service';
// import {BehaviourSubjectsService} from 'src/app/services/behaviour-subjects.service';
// import {DashboardService} from '../dashboard/dashboard.service';
// import {jsPDF} from 'jspdf';
// import html2canvas from 'html2canvas';
// import { HttpClient } from '@angular/common/http';
// import { L } from '@angular/cdk/keycodes';
// import { ReportServiceService } from '../../report-service.service';
// import { Observable } from 'rxjs';

// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-spline',
  templateUrl: './spline.component.html',
  styleUrls: ['./spline.component.scss']
})
export class SplineComponent implements OnInit, OnChanges {
  readonly progress: Observable<number>;
  isButtonDisabled: boolean = false;
  status: boolean;
  studentAttendance: any;
  speakingScore: any;
  roomId: any;
  li: any;
  lis: any = [];
  topStudent: Array<any> = [];
  bottomStudent: Array<any> = [];
  // linkEnabled: boolean = JSON.parse(localStorage.getItem('userPlanDetails') || '{}').postMeetingAnalytics;
  minuteToggle: any = true;
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
  segmentData: any = [];
  category: any;
  students: any = [];
  dispStdList: any = false;
  headingDuration: any;
  dispCatSpecificData: any = false;
  studentList: any;
  studentReportData: any;
  reportData: any;
  dynamicLink: any = '';
  engagementData: any;
  moodData: any;
  studentData: any = [];
  callDetails: any;
  callDate: any;
  summary: any;
  studentName: any;
  userId: any;
  // loder = false;
  segments: any[] = [
    {
      name: 'HIGH ',
      eng: 'ENGAGEMENT',
      mood: 'MOOD',
      indivSegKeyMap: 'hi_percentage',
      category: 'High',
      valMin: 80,
      valMax: 1000,
      className: 'title-success16-400',
      color: '#1FA000'
    },
    {
      name: 'MID ',
      eng: 'ENGAGEMENT',
      mood: 'MOOD',
      indivSegKeyMap: 'med_percentage',
      category: 'Medium',
      valMin: 40,
      valMax: 80,
      className: 'title-warning16-400',
      color: '#D5AD2A'
    },
    {
      name: 'LOW ',
      eng: 'ENGAGEMENT',
      mood: 'MOOD',
      indivSegKeyMap: 'low_percentage',
      category: 'Low',
      valMin: 0,
      valMax: 40,
      className: 'title-danger16-400',
      color: '#BA0E15'
    },
    {
      name: 'CAMERA OFF ',
      eng: '',
      mood: '',
      indivSegKeyMap: 'camoff_percentage',
      category: 'camOff',
      valMin: false,
      valMax: false,
      className: 'title-gray16-400',
      color: '#262525'
    }];

  segmentDuration: any[] = [
    { name: '1st hour', value: 1, selected: true },
    // {name: '2nd hour', value: 2, selected: false}
  ];
  metricType: any = {
    category: '',
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

  engType: any;
  metric: any;
  attendees: any = 0;
  userDetails: any;
  room: any;
  message: any;
  createrId: any;

  constructor(private router: Router,
    private date: DatePipe,
    private as: ApiService,
    private ss: SocketService,
    private route: ActivatedRoute,
    private sl: ScriptLoadService,
    public cdRef: ChangeDetectorRef,
    private bhvSub: BehaviourSubjectsService,
    private dashService: DashboardService,
    private zone: NgZone,
    private utility: UtilityService,
    private http: HttpClient,
    private repo: ReportServiceService

  ) {
    this.progress = this.emulateProgress();
    this.route.queryParams.subscribe(next => {
      if (next) {
        this.roomId = next.roomid;
        // this.getRoom(next.roomid);
      }
    });
  }
  // getRoom(roomid: any): void {
  //   this.as.getApiStatic('getInviteRoom?roomid=' + roomid).subscribe(next => {
  //     if (next) {
  //       this.room = next.response;
  //     }
  //   });

  // }


  public convertToPDF() {
    html2canvas(document.getElementById('report')!, { backgroundColor: '#000' }).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const width = 210;
      const height = 297;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height, '', 'FAST');
      pdf.save(this.summary + ' ' + this.callDate);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('test', changes);
  }

  ngOnInit(): void {
    this.as.getApiStatic('getInviteRoom?roomid=' + this.roomId).subscribe((room: any) => {
      this.room = room.response;
      this.summary = room.response.summary;
      // this.date.transform(room.response.start.dateTime, 'MM/dd/yyyy');
      this.callDate = this.date.transform(room.response.start.dateTime, 'MM/dd/yyyy');
      // console.log('date', this.callDate);

    })
    this.as.getApiStatic(`avg-engagement-req?roomid=` + this.roomId).subscribe((data: any) => {
      this.studentData = data;
      this.studentName = data[0].name;
      if ((this.studentData || '[]') && this.segmentData.length === 0) {
        this.createSegment((this.studentData || '[]'));
      }
    })

    this.getRerort(this.roomId);
    // this.as.getApiStatic(`getReportData?roomid=` + this.roomId).subscribe((data: any) => {
    //   if (data) {
    //     hideloader();
    //   }
    //   this.studentReportData = data.report.report.averageEngagement;
    //   this.moodData = data.report.report.averageMood;
    //   this.reportData = data.report;
    //   this.createrId = data.report.creator_ID;
    //   // console.log('pdf', data.report.pdf);

    //   this.getDashboardData(this.reportData);
    //   if (data.report.pdf === null) {
    //     this.as.getApiStatic(`generatePdfData?roomid=${this.roomId}&creator_ID=${this.createrId}`).subscribe((data: any) => {            //api changed from report-pdf to generatePdfData
    //       if (data) {
    //         hideloader();
    //       }
    //       this.isButtonDisabled = true;
    //       this.lis = data;
    //       this.callDetails = this.lis.report;
    //       this.convertSecondstoTime(this.callDetails);
    //       this.studentAttendance = this.lis.report.attendance;
    //       this.li = this.lis.report.students;
    //       this.sortData(this.lis.report.students);
    //       this.sortData1(this.lis.report.students);
    //       this.speakingScore = this.lis.report.speakingScore;
    //       if (!this.speakingScore) {
    //         this.speakingScore = 0;
    //       } else {
    //         this.speakingScore;
    //       }
    //     });
    //   } else {
    //     this.isButtonDisabled = true;
    //     this.callDetails = data.report.pdf;
    //     this.convertSecondstoTime(this.callDetails);
    //     this.studentAttendance = data.report.pdf.attendance;
    //     this.speakingScore = data.report.pdf.speakingScore;
    //       if (!this.speakingScore) {
    //         this.speakingScore = 0;
    //       } else {
    //         this.speakingScore;
    //       }
    //     this.sortData(data.report.pdf.students);
    //     this.sortData1(data.report.pdf.students);
    //   }
    //   // this.getDashboardData(this.reportData);
    // })
    // function hideloader() {
    //   document.getElementById('loading')
    //     .style.display = 'none';
    // }


    this.repo._dataSource.subscribe((data: boolean) => {
      this.status = data

    })
    this.bhvSub.engOrMood$.subscribe((data: any) => {
      this.engOrMood = data;
      this.categoryFilterVal = data ? 'moodCategory' : 'category';
      this.metricType.engType = data === 0 ? 'Session' : 'Mood';
      this.metricType.category = data === 0 ? 'segCategory' : 'segMoodCategory';
      this.metricType.segmentName = data === 0 ? 'ENGAGEMENT' : 'MOOD';
    });

  }
  getRerort(roomId: any) {
    this.as.getApiStatic(`getReportData?roomid=` + roomId).subscribe((data: any) => {
      if (data) {
        hideloader();
      }
      let interval: any;
      this.studentReportData = data.report.report.averageEngagement;
      this.moodData = data.report.report.averageMood;
      this.reportData = data.report;
      this.createrId = data.report.creator_ID;
      this.getDashboardData(this.reportData);
      if (data.report.pdf === null) {
        this.as.getApiStatic(`getPdfData?roomid=${roomId}`).subscribe((data: any) => {                       //report-pdf changed to generatePdfData
          if (data) {
            hideloader();
          }
          if (data.code === 202) {   //is generating
            interval = setInterval(() => {
              this.getRerort(roomId);
            }, 500);
          } else if (data.code === 200) {
            this.isButtonDisabled = true;
            this.callDetails = data.pdf;
            this.convertSecondstoTime(this.callDetails);
            this.studentAttendance = data.pdf.attendance;
            this.speakingScore = data.pdf.speakingScore;
            if (!this.speakingScore) {
              this.speakingScore = 0;
            } else {
              this.speakingScore;
            }
            this.sortData(data.pdf.students);
            this.sortData1(data.pdf.students);
          }
          else if (data?.code === 404) { // error generating report
            clearInterval(interval);
            this.as.getApiStatic(`generatePdfData?roomid=${roomId}&creator_ID=${this.createrId}`).subscribe((data: any) => {
              if (data) {
                hideloader();
              }
              this.isButtonDisabled = true;
              this.callDetails = data.report.pdf;
              this.convertSecondstoTime(this.callDetails);
              this.studentAttendance = data.report.pdf.attendance;
              this.speakingScore = data.report.pdf.speakingScore;
              if (!this.speakingScore) {
                this.speakingScore = 0;
              } else {
                this.speakingScore;
              }
              this.sortData(data.report.pdf.students);
              this.sortData1(data.report.pdf.students);
            },
              (err: any) => console.error('Generate Report API error', err));
          }
        })
      } else {
        this.isButtonDisabled = true;
        this.callDetails = data.report.pdf;
        this.convertSecondstoTime(this.callDetails);
        this.studentAttendance = data.report.pdf.attendance;
        this.speakingScore = data.report.pdf.speakingScore;
        if (!this.speakingScore) {
          this.speakingScore = 0;
        } else {
          this.speakingScore;
        }
        this.sortData(data.report.pdf.students);
        this.sortData1(data.report.pdf.students);
      }
    })
    function hideloader() {
      document.getElementById('loading')
        .style.display = 'none';
    }
  }
  createSegment(data: any): void {
    data.forEach((el: any) => {
      el.callDetails = this.utility.convertDate(el.engagement_avg, 60);
    });

    if (this.callDetails) {
      this.duration = this.utility.calculateDuration(data).duration;
      if (this.duration > 3600) {
        this.segmentDuration.push({ name: '2nd hour', value: 2, selected: false });
      }
      this.duration = Math.round(this.duration / 4);
      for (let i = 1; i <= 4; i++) {
        this.headingDuration = this.utility.convertDate(this.duration * (1), this.callDetails.duration);
        const seg: any = {
          segment: i,
          data: [],
          metricAverage: { high: 0, medium: 0, low: 0, camOff: 0 },
          moodAverage: { high: 0, medium: 0, low: 0, camOff: 0 },
          catSpecificData: { high: [], medium: [], low: [], camOff: [] },
          metricCount: 0,
          duration: this.utility.convertDate(this.duration * (i - 1), this.callDetails.duration) + ' - ' +
            this.utility.convertDate(this.duration * i, this.callDetails.duration)
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
        for (let y = 0; i === 1 && y < 4; y++) {
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
    } else {
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

  studentListPanel(val: any): void {
    this.dispStdList = val;
  }

  getCategoryVal(): any {
    return this.categoryFilterVal;
  }

  convertSecondstoTime(sec: any): any {
    const given_seconds = sec.callDuration;

    const dateObj = new Date(given_seconds * 1000);
    // const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();

    // const timeString = hours.toString().padStart(2, '0')
    //   + ':' + minutes.toString().padStart(2, '0')
    //   + ':' + seconds.toString().padStart(2, '0');
    const timeString = minutes.toString().padStart(2, '0') + 'm '
      + ': ' + seconds.toString().padStart(2, '0') + 's ';

    document.getElementById('sessionDuration').textContent
      = (`${timeString}`);
  }

  sortData(inputArray: Array<any>): any {
    inputArray = inputArray.sort((a: any, b: any) =>
      a.averageEngagement < b.averageEngagement ? 1 : a.averageEngagement > b.averageEngagement ? -1 : 0
    );
    if (inputArray.length === 1 || inputArray.length < 10) {
      this.topStudent.push(inputArray[0]);

    }

    if (inputArray.length > 10) {
      for (let i = 0; i < 3; i++) {
        this.topStudent.push(inputArray[i]);
      }
    }
  }
  sortData1(inputArray: Array<any>): any {
    const inputArray1 = inputArray.sort((a: any, b: any) =>
      a.averageEngagement < b.averageEngagement ? -1 : a.averageEngagement > b.averageEngagement ? 1 : 0
    );

    if (inputArray.length === 1) {

      return 0

    }
    if (inputArray1.length < 10) {
      this.bottomStudent.push(inputArray1[0]);

    }
    if (inputArray1.length > 10) {
      for (let i = 0; i < 3; i++) {
        this.bottomStudent.push(inputArray1[i]);

      }
    }
  }

  emulateProgress() {
    return new Observable<number>(observer => {
      let val = 0;
      const interval = setInterval(() => {
        if (val < 100) {
          val++;
        } else {
          val = 0;
        }
        observer.next(val);
      }, 10);
      return () => {
        clearInterval(interval);
      };
    });
  }
  closeDialog(event: any) {
    this.router.navigateByUrl(`report/dashboard?roomid=${this.roomId}`).then(data => {
    }).catch(error => {
      console.error(error);
    })
  }

}


