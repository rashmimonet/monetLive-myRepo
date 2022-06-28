import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../../../../../../shared/services/api.service';
import { ThirdPartyService } from '../../../../../../../shared/services/third-party.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from "../../../../../../../shared/services/utility.service";
import { DatePipe } from '@angular/common';
import { I } from '@angular/cdk/keycodes';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ThirdPartyService],
  encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements OnInit {
  adminId = JSON.parse(localStorage.getItem('userDetails') || '').email;
  debounce: any;
  totalPages: number | undefined;
  totalRecords: number | undefined;
  limit: number | undefined;
  page: number = 1;
  recordingsRes: any;
  filterData: any = [];
  recordData: any = [];
  startDate: any;
  endDate: any;
  vdoLink: any;
  vdoShow = false;
  loggedInService = '';
  msg = '';
  loder = false;
  paginationIndex = 0;
  pageSize: number = 20;
  pageSize1: number = 20;
  record: number = 0;
  currentPage: any;
  isValidDate: boolean ;
  displayedColumns = ['index', 'summary', 'roomid', 'startTime', 'duration', 'record', 'report', 'delete'];
  dataSource: MatTableDataSource<any> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('vdo') vdoTag: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private api: ApiService, private tps: ThirdPartyService, private utility: UtilityService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    // this.getRecording();
    this.loggedInService = this.tps.isLoggedIn().service;
    this.getAllInviteRoomsData();
  }

  getRecording({ start = '', end = '' } = {}): void {
    this.api.postApiStatic('getRecordings', { admin_id: this.adminId }).subscribe((res: any) => {
      this.recordingsRes = res.response;
      // this.getAllInviteRoomsData(res.response, start, end);
    });
  }
  paginationEventTrigger(event: any) {
    // if(this.totalRecords > this.dataSource.filteredData.length){
    //this.paginator.pageIndex = event.pageIndex;
    // console.log('page', event);
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.paginationIndex = event.pageIndex * event.pageSize;
    this.totalRecords = this.dataSource.filteredData.length;
    // this.getAllInviteRoomsData(this.recordingsRes, this.startDate?.toString(), this.endDate?.toString());
    this.getAllInviteRoomsData();
    // }
  }

  // getAllInviteRoomsData(data: any, startDate: string, endDate: string): void {
  getAllInviteRoomsData({ start = '', end = '' } = {}): void {
    this.loder = false;
    const postData = {
      email: this.adminId,
      start: this.startDate,
      end: this.endDate,
    };
    this.api.postApiStatic(`v2/getreportsList?page=${this.page}&limit=${this.pageSize}&alive=2`, postData).subscribe((res: any) => {
      if (!res.error) {
        this.msg = '';
        this.isValidDate = false;
        this.filterData = this.reportDataFilter(res.response.results);
        // this.filterData = res.response.results;
        this.currentPage = res.response.currentPage;
        this.currentPage = res.response.currentPage - 1;
        //  this.page = res.response.currentPage + 1;                                   
        this.totalPages = res.response.totalPage;
        this.totalRecords = res.response.totalRecords;
        this.limit = res.response.limit;
        if (this.filterData && this.filterData.length) {
          this.dataSource = new MatTableDataSource<any>(this.filterData);
          //this.dataSource = new MatTableDataSource<any>(this.recordData);
          if (this.page <= 1) {
            this.dataSource.paginator = this.paginator;
          }
        } else {
          this.dataSource = new MatTableDataSource<any>([]);
          this.msg = 'No report data found';
        }
      } else {
        // this.msg = res.message;
        this.isValidDate = true;
        this.msg = 'No report data found';
      }
      this.loder = true;
    });
  }


  reportDataFilter(allData: any): any {
    // allData.forEach((aData: any) => {
    //   if (data) {
    //     data.forEach((rData: any) => {
    //       if (aData.roomid === rData.roomid) {
    //         aData.playBtn = rData.link;                        //commented by me
    //       }
    //     });
    //   } else {
    //     aData.playBtn = '';
    //   }
    // });
    return allData.filter((item: any) => item.alive === 2);             //commented and added return allData;
    // return allData;
    // return [];
  }
  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = this.filterPeriod;
  }

  filterPeriod(data: any, filter: string) {
    return data.referenceDate > this.startDate.value() && data.referenceDate < this.endDate.value();
  }

  // dateDataFilter(): void {
  //   if (this.recordData) {
  //     this.recordData = this.filterData.filter((item: any) => {
  //       if (
  //         new Date(item.start.dateTime) >= this.startDate &&
  //         new Date(item.start.dateTime) <=
  //         new Date(new Date(this.endDate).setHours(23, 59, 59, 999))
  //       ) {
  //         return item;
  //       }
  //     });
  //     if (!this.recordData.length) {
  //       this.msg = ' Data Not Found ';
  //     } else {
  //       this.msg = '';
  //     }
  //   }
  // }

  dateDataFilter(): void {
          this.endDate =  new Date(new Date(this.endDate).setHours(23, 59, 59, 999));
          this.getAllInviteRoomsData({ start: this.startDate.toString(), end: this.endDate.toString() });
    // this.getAllInviteRoomsData({ start: this.startDate.toString(), end: this.endDate.toString() });

  }

  resetData(): void {
    this.startDate = '';
    this.endDate = '';
    this.msg = '';
    this.recordData = this.filterData;
    // this.getRecording();
    this.getAllInviteRoomsData();
  }

  getDuration(s: any, e: any): any {
    const difference =
      Math.abs(new Date(s).getTime() - new Date(e).getTime()) / 1000;
    const timeArray = this.utility.convertDate(difference, difference).split(':');
    return timeArray.length === 2
      ? `${timeArray[0]} : ${timeArray[1]}`
      : `${timeArray[0]} : ${timeArray[1]} : ${timeArray[2]} `;
  }

  playVdo(link: any): void {
    this.vdoShow = true;
    this.vdoLink = link;
  }

  closeVdo(): void {
    this.vdoShow = false;
    this.vdoTag.nativeElement.pause();
  }

  viewReport(e: any): void {
    const URL = `${window.location.origin}/report/dashboard?roomid=${e.roomid}&id=${new Date()}`;
    window.open(URL);
  }

  // paginationChange(event: any): void {
  //   this.loder = false;
  //   this.page = event.pageIndex;
  //   this.limit = event.pageSize;
  //   this.paginationIndex = event.pageIndex * event.pageSize;
  //   this.getAllInviteRoomsData(this.recordingsRes, this.startDate?.toString(), this.endDate?.toString());
  // }

}


