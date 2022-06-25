import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../../../../shared/services/api.service';
import { Router } from '@angular/router';
import { ThirdPartyService } from '../../../../../../../shared/services/third-party.service';
import {UtilityService} from "../../../../../../../shared/services/utility.service";

@Component({
  selector: 'app-recording',
  templateUrl: './recording.component.html',
  styleUrls: ['./recording.component.scss'],
  providers: [ThirdPartyService],
})
export class RecordingComponent implements OnInit {
  adminId = JSON.parse(localStorage.getItem('userDetails') || '').email;
  // adminId = 'malkoti.mayank@gmail.com';
  loggedInService = '';
  recordData: any = [];
  filterData: any = [];
  vdoLink: any;
  vdoShow = false;
  startDate: any;
  endDate: any;
  loder = false;
  msg = '';
  displayedColumns = [
    'Sr No',
    'Topic',
    'Id',
    'Start Time',
    'Duration',
    'Record',
    'Report',
    'Delete',
  ];

  @ViewChild('vdo') vdoTag: any;
  constructor(
    private api: ApiService,
    private route: Router,
    private tps: ThirdPartyService,
    private utility: UtilityService
  ) {}

  fxFlexValue = (i: number) => {
    if (i === 0) {
      return 7;
    } else if (i === 1 || i === 2 || i === 4) {
      return 15;
    } else if (i === 3) {
      return 25;
    } else {
      return 8;
    }
  };
  ngOnInit(): void {
    this.getRecording();
    if (this.tps.isLoggedIn().status) {
      this.loggedInService = this.tps.isLoggedIn().service;
    } else {
      this.loggedInService = this.tps.isLoggedIn().service;
      // console.log('User not Logged IN with any of the two');
    }
  }

  getRecording = () => {
    this.api
      .postApiStatic('getRecordings', { admin_id: this.adminId })
      .subscribe((next) => {
        this.getAllInviteRoomsData(next.response);
      });
  };
  getAllInviteRoomsData = (data: any) => {
    const postData = {
      email: JSON.parse(localStorage.getItem('userDetails') || '').email,
      source: this.loggedInService,
    };
    // this.api.getApi('getAllInviteRooms?email=' + this.adminId).subscribe(next => {
    this.api.postApiStatic('getAllInviteRooms', postData).subscribe((next: any) => {
      if (!next.error) {
        this.msg = '';
        this.filterData = this.reportDataFilter(next.response, data);
        if (this.filterData && this.filterData.length) {
          this.recordData = this.filterData
            .sort(
              (a: any, b: any) =>
                +new Date(a.start.dateTime) - +new Date(b.start.dateTime)
            )
            .reverse();
        } else {
          this.msg = 'Data not Found';
        }
      } else {
        this.msg = next.message;
      }
      // console.log('filter', this.filterData);

      this.loder = true;
    });
  };

  reportDataFilter = (allData: any, data: any) => {
    allData.forEach((aData: any) => {
      if (data) {
        data.forEach((rData: any) => {
          if (aData.room === rData.room) {
            aData.playBtn = rData.link;
          }
        });
      } else {
        aData.playBtn = '';
      }
    });
    // return allData;
    return allData.filter((item: any) => item.alive === 0);
  };

  // recordFilterData = (allData: any, data: any) => {
  //   allData.forEach((fill: any) => {
  //     data.forEach((record: any) => {
  //       if (record.room === fill.room) {
  //         fill.playBtn = record.link;
  //         this.filterData.push(fill);
  //       }
  //     });
  //   });
  //
  // }
  dateDataFilter = () => {
    if (this.recordData) {
      this.recordData = this.filterData.filter((item: any) => {
        if (
          new Date(item.start.dateTime) >= this.startDate &&
          new Date(item.start.dateTime) <=
            new Date(new Date(this.endDate).setHours(23, 59, 59, 999))
        ) {
          return item;
        }
      });
      // console.log(this.recordData);
      if (!this.recordData.length) {
        this.msg = ' Data Not Found ';
      } else {
        this.msg = '';
      }
    }
  };
  resetData = () => {
    this.startDate = '';
    this.endDate = '';
    this.msg = '';
    this.recordData = this.filterData;
  };

  getDuration = (s: any, e: any) => {
    const difference =
      Math.abs(new Date(s).getTime() - new Date(e).getTime()) / 1000;
    const timeArray = this.utility.convertDate(difference, difference).split(':');
    return timeArray.length === 2
      ? `${timeArray[0]} : ${timeArray[1]}`
      : `${timeArray[0]} : ${timeArray[1]} : ${timeArray[2]} `;
  };

  playVdo = (link: any) => {
    this.vdoShow = true;
    this.vdoLink = link;
  };
  closeVdo = () => {
    this.vdoShow = false;
    this.vdoTag.nativeElement.pause();
  };
  viewReport = (e: any) => {
    const URL = `${window.location.origin}/report/dashboard?roomid=${e.roomid}&id=${new Date()}`;
    window.open(URL);
  };
}
