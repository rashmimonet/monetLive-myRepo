import { Component, OnInit, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { ApiService } from '../../../../../../../shared/services/api.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { ThirdPartyService } from '../../../../../../../shared/services/third-party.service';
import { UtilityService } from "../../../../../../../shared/services/utility.service";

@Component({
  selector: 'app-my-meeting',
  templateUrl: './my-meeting.component.html',
  styleUrls: ['./my-meeting.component.scss'],
  providers: [ThirdPartyService]
})
export class MyMeetingComponent implements OnInit {
  loggedInService = '';
  userDetails: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
  dataPreview: any = {};
  meetingData: [] | undefined;
  toggleBtnValue = 'Upcoming';
  selectedDate: any = {};
  dateSelect: any;
  filterSelects = 'month';
  limit = 20;
  page = 1;
  isError: boolean;
  recentData: any= [];
  // adminId = 'malkoti.mayank@gmail.com';
  adminId = JSON.parse(localStorage.getItem('userDetails') || '').email;
  recentMeetingData: any = {};
  toDayZeroTime: any;
  @Output() tabSelected = new EventEmitter();
  msg: string;
  email: any;
  planType: any;
  constructor(private api: ApiService, private route: Router, private tps: ThirdPartyService, private utility: UtilityService) { }


  ngOnInit(): void {
    // this.toDayZeroTime = this.dateSet(new Date(), 'zero');
    this.dateSelect = this.toDayZeroTime;
    this.getFilterDataApi(this.filterSelects);
    this.loggedInService = this.tps.isLoggedIn().service;
    this.getAllInviteRoomsData();
    this.email = this.userDetails.email;
    this.api.getApiStatic(`userplanDetails?email=${this.email}`).subscribe((data: any) => {
      this.planType = data.planType;
      // console.log('plan upcoming', this.planType);
      
    });
  }


  getAllInviteRoomsData(): void {
    const postData = {
      email: JSON.parse(localStorage.getItem('userDetails') || '').email,
      source: this.loggedInService
    };
    this.api.postApi1(`v2/getreportsList?page=${this.page}&limit=${this.limit}`, postData).subscribe(next => {
      // this.api.postApi1('getAllInviteRooms', postData).subscribe(next => {
      if (!next.error) {
        this.msg = '';
        this.isError = false;
        this.toDayZeroTime = this.dateSet(new Date(), 'zero');
        this.meetingData = next.response.results.map((item: any) => {
          item.start.dateTime = new Date(item.start.dateTime);
          // item.end = new Date(item.end);
          return item;
        });
        this.recentMeetingData.recent = this.reportDataFilter(next.response.results);
        // console.log('recent', this.reportDataFilter(next.response.results));
        this.recentData = this.recentMeetingData.recent.slice(0,3);
        // console.log('recent ans', this.recentData);
        this.calenderEvent(this.toDayZeroTime);
      } else if (next.code === 400) {
        this.utility.notify(next.message, 'error');
      } else {
        this.isError = true;
        this.msg = next.message;
      }
    });
  }

  reportDataFilter(allData: any): any {                         //added to filter past data
    return allData.filter((item: any) => item.alive === 2);
  }
reportUpcomingFilter(allData: any){
  return allData.filter((item: any) => item.scheduled === true);
}
  getFilterDataApi = (timeLine: string) => {
    this.api.getApi1(`my-meetings?creator_ID=${this.adminId}&timeline=${timeLine}`).subscribe(next => {
      if (!next.error) {
        const fillData = next.data;
        const j = fillData.duration / 60;
        const h = String(Math.trunc(j / 60)).padStart(2, '0') + ' h : ';
        const m = String(Math.trunc(j % 60)).padStart(2, '0') + ' m';
        const meet = fillData.meetings === 1000 ? Math.floor((fillData.meetings / 1000)) + ' k' : fillData.meetings;
        const eng = fillData.meetings = fillData.overallAverageEngagement ? fillData.overallAverageEngagement.toFixed(2) : 0;
        const Mood = fillData.meetings = fillData.overallAverageMood ? fillData.overallAverageMood.toFixed(2) : 0;
        this.recentMeetingData.fillData = { time: h + m, meeting: meet, engagement: eng, mood: Mood };
        // console.log('time', this.recentMeetingData.fillData);
        
      } else {
        this.utility.notify(next.message, 'error');
      }

    });
  }

  filterSelect = (e: any) => {
    this.getFilterDataApi(e);
  }

  getTime = (e: any) => {
    let t = e.toString().split('T');
    t = t[1] > '12.00' ? t[1].slice(0, 5) + ' PM' : t[1].slice(0, 5) + ' AM';
    return t;
  }
  toggleBtn = (value: string) => {
    this.toggleBtnValue = value;
    this.dateSelect = this.toDayZeroTime;
    if(this.dateSelect !== undefined){
      this.calenderEvent(this.toDayZeroTime);
    }
   
  }

  dataFilterBtn = (btnValue: string) => {
    let data: any;
    if (btnValue === 'Upcoming') {
      data = this.meetingData.filter((item: any) => new Date(item.start.dateTime) >= new Date());
    } else {
      data = this.meetingData.filter((item: any) => new Date(item.start.dateTime) <= new Date());
    }
    return data;
  }

  dateFilter = (e: any, day: string) => {
    const date = new Date(e);
    const Day: any = {};
    if (day === 'today') {
      Day.start = this.dateSet(date, 'zero');
      Day.end = this.dateSet(date, 't');
    } else if (day === 'yesterday') {
      const tDate = date.setDate(date.getDate() - 1);
      Day.start = this.dateSet(tDate, 'zero');
      Day.end = this.dateSet(tDate, 't');
    } else {
      const tDate = date.setDate(date.getDate() + 1);
      Day.start = this.dateSet(tDate, 'zero');
      Day.end = this.dateSet(tDate, 't');
    }
    return Day; // tomorrow
  }

  dateSet = (e: any, type: any) => {
    if (type === 'time') {
      const h = new Date().getHours();
      const m = new Date().getMinutes();
      const setTime = new Date().setHours(h, m, 0, 0);
      return new Date(setTime);
    }
    if (type === 'zero') {
      return new Date(new Date(e).setHours(0, 0, 0, 0));
    } else {
      return new Date(new Date(e).setHours(23, 59, 59, 999));
    }
  }

  calenderEvent = (date: any) => { 
    this.dataPreview = [];
    if (date > this.toDayZeroTime) {
      this.toggleBtnValue = 'Upcoming';
    } else if (date < this.toDayZeroTime) {
      this.toggleBtnValue = 'Past';
    }
    if (this.toggleBtnValue === 'Upcoming') {
      this.selectedDate.Today = this.dateFilter(date, 'today');
      this.selectedDate.Yesterday = this.dateFilter(date, 'any');
      const upData = this.dataFilterBtn(this.toggleBtnValue);
      const tData = this.reportUpcomingFilter(this.dataFilter(this.selectedDate.Today, upData));
      if (tData && tData.length  && this.planType !== 'expired') {
        this.dataPreview.toDay = tData;
      } else {
        if(this.planType === 'expired'){
          this.dataPreview.tMsg = 'Plan Expired';
        }else{
          this.dataPreview.tMsg = 'Data Not  Available';  
        } 
        // this.dataPreview.tMsg = 'Data Not  Available';
        // console.log('tData', this.dataPreview.toDay);
      }
      const yData = this.reportUpcomingFilter(this.dataFilter(this.selectedDate.Yesterday, upData));
      if (yData && yData.length && this.planType !== 'expired') {
        //changed by me tData to yData
        this.dataPreview.toMorrow = yData;
      } else {
        if(this.planType === 'expired'){
          this.dataPreview.yMsg = 'Plan Expired';
        }else{
          this.dataPreview.yMsg = 'Data Not  Available';  
        }  
      }
    } else {
      this.selectedDate.Today = this.dateFilter(date, 'today');
      this.selectedDate.Yesterday = this.dateFilter(date, 'yesterday');
      const pData = this.dataFilterBtn(this.toggleBtnValue);
      const tData = this.reportDataFilter(this.dataFilter(this.selectedDate.Today, pData));
      if (tData && tData.length) {
        // this.dataPreview.toDay = this.reportDataFilter(tData);
        this.dataPreview.toDay = tData;
      } else {
        this.dataPreview.tMsg = 'Data Not  Available';
      }
      const yData = this.reportDataFilter(this.dataFilter(this.selectedDate.Yesterday, pData));

      if (yData && yData.length) {
        // this.dataPreview.toMorrow = this.reportDataFilter(yData);
        this.dataPreview.toMorrow = yData;
      } else {
        this.dataPreview.yMsg = 'Data Not  Available';
      }
    }
  }

  dataFilter = (date: any, data: any) => {
    if (data) {
      const d = data.filter((item: any) => {
        if (new Date(item.start.dateTime) >= new Date(date.start) && new Date(item.start.dateTime) <= new Date(date.end)) {
          return item;
        }
      });
      return d.sort((a: any, b: any) => a.start.dateTime - b.start.dateTime).reverse();
    }
  }

  calenderHeaderStyle = () => { // set color to the weekend dates
    let d: any;
    d = document.querySelectorAll('.mat-calendar-table-header')[0];
    if (d) {
      d = d.firstElementChild;
      if (d) {
        const f = d.firstElementChild;
        if (f) {
          f.style.color = 'red';
        }
        const l = d.lastElementChild;
        if (l) {
          l.style.color = 'blue';
        }
      }
    }
  }
  dateClass = () => { // add classes to weekend dates
    return (date: Date): MatCalendarCellCssClasses => {
      setTimeout(() => {
        this.calenderHeaderStyle();
      }, 100);
      const day = date.getDay();
      if (day === 0) {
        return 'sundayClass';
      } else if (day === 6) {
        return 'saturdayClass';
      } else {
        return '';
      }
    };
  }

  viewReportRecent = (e: any) => {
    const URL = `${window.location.origin}/report/dashboard?roomid=${e.roomid}&id=${new Date()}`;
    window.open(URL);
  }

  viewReport = (e: any) => {
    if (this.toggleBtnValue === 'Past') {
      const URL = `${window.location.origin}/report/dashboard?roomid=${e.roomid}&id=${new Date()}`;
      window.open(URL);
    } else {
      this.route.navigate(['manager/inspect'], { queryParams: { roomid: e.roomid, id: new Date() }, queryParamsHandling: 'merge' });
    }
  }
}
