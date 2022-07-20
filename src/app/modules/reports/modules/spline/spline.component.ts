
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
  loading: boolean = false;
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
      }
    });
  }

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
      this.callDate = this.date.transform(room.response.start.dateTime, 'MM/dd/yyyy');
    })
    this.as.getApiStatic(`avg-engagement-req?roomid=` + this.roomId).subscribe((data: any) => {
      this.studentData = data;
      this.studentName = data[0].name;
      if ((this.studentData || '[]') && this.segmentData.length === 0) {
        this.createSegment((this.studentData || '[]'));
      }
    });
    this.getRerort(this.roomId);
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
        this.loading = true;
        // hideloader();
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
            this.loading = true;
            // hideloader();
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
                this.loading = true;
                // hideloader();
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
    // function hideloader() {
    //   document.getElementById('loading')
    //     .style.display = 'none';
    // }
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


