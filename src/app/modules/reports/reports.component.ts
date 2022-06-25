import { Component, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../shared/services/socket.service';
import { BehaviourSubjectsService } from '../../services/behaviour-subjects.service';
import { ScriptLoadService } from '../shared/services/script-load.service';
import { UtilityService } from "../shared/services/utility.service";

declare function fetchAvailableInstance(link: string, ip: string): any;


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: []
})
export class ReportsComponent implements OnInit {
  callDetails: any = { engagementAvg: 0, moodAvg: 0, finalDuration: 0 };
  dataAvailable: boolean = false;
  params: any;
  finalStudentData: any;
  canLoadChild = false;
  pdfData: any;
  check: { NumberOfFaces: any; engagement: any; mood: any; segment: any; createdAt: any; category: string; moodCategory: string; };
  createrId: any;
  constructor(public api: ApiService,
    private route: ActivatedRoute,
    private ss: SocketService,
    private router: Router,
    private bhvSub: BehaviourSubjectsService,
    private sl: ScriptLoadService,
    private zone: NgZone,
    private utility: UtilityService
  ) { }

  ngOnInit(): void {
    // debugger
    this.sl.load('janus').then(() => {
      this.sl.load('user').then(() => {
        this.route.queryParams.subscribe((next: any) => {
          this.api.getApiStatic(`getRoomIp?roomid=${next.roomid}`).subscribe((ip: any) => {
            if (ip.room.grp) {
              fetchAvailableInstance(ip.room.grp, ip.room.instance);
              // this.ss.generateSocket();
              this.bhvSub.obDynamicLink(ip.room.grp);
              if (next) {
                setTimeout(() => this.checkReportRes(next.roomid), 500);
              }
            }
          });
        });
      });
    });
  }

  checkReportRes(roomId: number): void {
    let interval: any;
    this.api.getApiStatic('getReportData?roomid=' + roomId).subscribe((success: any) => {
      if (success) {
        if (success?.code === 202) { // generating report
          interval = setInterval(() => {
            this.checkReportRes(roomId);
          }, 500);
          // setTimeout(() => this.checkReportRes(roomId, time + 5000), time);
        }
        else if (success?.code === 404) { // error generating report
          clearInterval(interval);
          const { email: creator_ID } = JSON.parse(localStorage.getItem('userDetails') || '');
          const postData = { roomid: roomId, creator_ID };
          this.api.postApi('generateReport', postData).subscribe((res: any) => {
            //localStorage.setItem('reportData', JSON.stringify(res?.report));
            this.setCallDetails(roomId, res?.report);
          },
            (err: any) => console.error('Generate Report API error', err));
        }
        else {
          // console.log('Report data for storage :', success?.report);
          localStorage.setItem('reportData', JSON.stringify(success?.report));
          this.setCallDetails(roomId, success?.report); // called on getReportData API success
        }
      }
    },
      (error: any) => console.error('Get Report Data API error', error));

  }

  setCallDetails(roomid: any, report: any): void {
    // debugger
    if (report) {
      /*     this.ss.generateSocket();
           this.ss.socket.on('avg-engagement-res', (data: any) => {
             // console.log('Avg-eng-res :', data);
             localStorage.setItem('avg-eng-res', JSON.stringify(data));
             if (data) {
               this.zone.run(() => {
                 let dataCount = 0;
                 const reducedAvgArr: any = [];
                 this.callDetails.duration = Math.ceil(this.utility.calculateDuration(data).duration / 4);
                 this.callDetails.finalDuration = this.utility.convertDate(Math.ceil(this.utility.calculateDuration(data).duration / 4), 60);
                 this.api.studentData = data.map((std: any) => {
                   const avg = std.session_data.reduce((ac: any, st: any) => {
                     dataCount++;
                     ac.engAvg += st.engagement;
                     ac.moodAvg += st.mood;
                     return ac;
                   }, {engAvg: 0, moodAvg: 0});
                   reducedAvgArr.push({eng: avg.engAvg, mood: avg.moodAvg});
                   std.engagement = std.session_data.length !== 0 ? Math.floor(avg.engAvg / std.session_data.length) : 0;
                   std.category = this.utility.setCategory(std.engagement);
                   std.stdDuration = this.utility.convertDate((this.utility.calculateDuration([std]).duration), 60);
                   std.mood = Math.floor(avg.moodAvg / (std.session_data.length));
                   return std;
                 });
                 this.callDetails.engagementAvg = Math.floor(Math.round(reducedAvgArr.reduce((a: any, b: any) => a + b.eng, 0)) / dataCount);
                 this.callDetails.moodAvg = Math.floor(Math.round(reducedAvgArr.reduce((a: any, b: any) => a + b.mood, 0)) / dataCount);
                 this.finalStudentData = this.api.studentData;
                 if (!report.report) {
                   this.engMoodPostApi(roomid);
                 }
                 this.canLoadChild = true;
               });
             }
           });
           this.ss.socket.emit('avg-engagement-req', {roomid});*/
      this.api.getApiStatic(`avg-engagement-req?roomid=` + roomid).subscribe((data: any) => {
        // console.log('Avg-eng-res :', data);
        // localStorage.setItem('avg-eng-res', JSON.stringify(data));
        if (data) {
          // this.zone.run(() => {
          let dataCount = 0;
          const reducedAvgArr: any = [];
          this.callDetails.duration = Math.ceil(this.utility.calculateDuration(data).duration / 4);
          this.callDetails.finalDuration = this.utility.convertDate(Math.ceil(this.utility.calculateDuration(data).duration / 4), 60);
          this.api.studentData = data.map((std: any) => {
            const avg = std.session_data.reduce((ac: any, st: any) => {
              dataCount++;
              ac.engAvg += st.engagement;
              ac.moodAvg += st.mood;
              return ac;
            }, { engAvg: 0, moodAvg: 0 });
            reducedAvgArr.push({ eng: avg.engAvg, mood: avg.moodAvg });
            std.engagement = std.session_data.length !== 0 ? Math.floor(avg.engAvg / std.session_data.length) : 0;
            std.category = this.utility.setCategory(std.engagement);
            std.category_engagement = std.engagement > 80 ? 'High' : std.engagement > 40 ? 'Medium' : 'Low';
            std.stdDuration = this.utility.convertDate((this.utility.calculateDuration([std]).duration), 60);
            std.mood = Math.floor(avg.moodAvg / (std.session_data.length));
            std.category_mood = std.mood > 80 ? 'High' : std.mood > 40 ? 'Medium' : 'Low';
            return std;
          });
          this.callDetails.engagementAvg = Math.floor(Math.round(reducedAvgArr.reduce((a: any, b: any) => a + b.eng, 0)) / dataCount);
          this.callDetails.moodAvg = Math.floor(Math.round(reducedAvgArr.reduce((a: any, b: any) => a + b.mood, 0)) / dataCount);
          this.finalStudentData = this.api.studentData;
          if (!report.report) {
            this.engMoodPostApi(roomid);
          }
          this.canLoadChild = true;
          // });
        }
      });
    }
  }


  // if (data) {
  //   this.studentsList = this.studentsList.map((std: any) => {
  //     std.engagement = Math.floor(data[std.std_id]?.engagement || 0);
  //     std.mood = Math.floor(data[std.std_id]?.mood_score || 0);
  //     std.category_engagement = std.engagement > 80 ? 'High' : std.engagement > 40 ? 'Medium' : 'Low';
  //     std.category_mood = std.mood > 80 ? 'High' : std.mood > 40 ? 'Medium' : 'Low';
  //     return std;
  // faceData(){
  //        this.ss.socket.on('face-data', (data: any) => {
  //                  if (data && this.params.student_id) {
  //                    const studentDataLive = {
  //                      NumberOfFaces: data[this.params.student_id].NumberOfFaces,
  //                      engagement: data[this.params.student_id].engagement,
  //                      mood: data[this.params.student_id].mood_score,
  //                      segment: data[this.params.student_id].segment,
  //                      createdAt: data[this.params.student_id].createdAt,
  //                      category: this.utility.setCategory(data[this.params.student_id].engagement),
  //           //            std.category_engagement = std.engagement > 80 ? 'High' : std.engagement > 40 ? 'Medium' : 'Low';
  //           // std.category_mood = std.mood > 80 ? 'High' : std.mood > 40 ? 'Medium' : 'Low';
  //                      moodCategory: this.utility.setCategory(data[this.params.student_id].mood_score)
  //                    };
  //                    this.check = studentDataLive;
  //                  }
  //                });
  // }

  engMoodPostApi = (roomId: any) => { // for average eng / mood scores
    const obj = { roomid: roomId, report: { averageEngagement: this.callDetails.engagementAvg, averageMood: this.callDetails.moodAvg } };
    this.api.postApi('addFinalReport', obj).subscribe((res: any) => {
      if (res.error) {
        this.utility.notify(res.message, '');
      }
    });
  }

  checkDataAvailability(data: any): boolean {
    return !!(data.pieData.length && data.overallEngagement.length);
  }
}
