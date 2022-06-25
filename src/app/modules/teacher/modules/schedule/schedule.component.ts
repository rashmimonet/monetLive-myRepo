import {Component, NgZone, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ApiService} from '../../../shared/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ThirdPartyService} from "../../../shared/services/third-party.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [ApiService]
})
export class ScheduleComponent implements OnInit {
  loggedInService = '';
  params: any;
  eventList: any;
  eventData: any;
  form: FormGroup;
  now = new Date();
  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private zone: NgZone,
              private api: ApiService,
              private router: Router,
              private tps: ThirdPartyService) {
    this.form = this.fb.group({
      student: new FormArray([this.addStudent()])
    });
  }

  addStudent(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      link: ['', Validators.required],
    });
  }
  ngOnInit(): void {
   this.getRooms();
   if (this.tps.isLoggedIn().status) {
     this.loggedInService = this.tps.isLoggedIn().service;
   }
   else {
     this.loggedInService = this.tps.isLoggedIn().service;
     // console.log('User not Logged IN with any of the two');
   }
  }
  getEvents(e: any): void {
    this.zone.run(() => {
      this.getRooms();
    });
  }

  getOutlookEvents(e: any): void {

  }

  getRooms(): void {
    const postData = {
      email: JSON.parse(localStorage.getItem('userDetails') || '').email,
      source: this.loggedInService
    };
    // this.api.postApi('getAllInviteRooms', postData).subscribe(next => {
      this.api.postApi1('getAllScheduleInviteRooms', postData).subscribe(next => {
      const data = next.response.filter((item: any) => {
        item.start.dateTime = new Date(item.start.dateTime).getTime();
        item.end.dateTime = new Date(item.end.dateTime).getTime();
        item.now = new Date().getTime();
        return item.summary;
      });
      this.eventData = data.sort((a: any, b: any) => {
        return  b.start.dateTime - a.start.dateTime;
      });
    });
  }
  joinMeet(meet: any): void {
    const param = {
      room: meet.room,
      roomid: meet.roomid,
      id: Math.floor(Math.random() * 1000000)
    };
    // console.log('CHECK QUERY PARAMS :', param);
    this.router.navigate(['teacher/call'], {queryParams: param, queryParamsHandling: 'merge'});
  }
}
