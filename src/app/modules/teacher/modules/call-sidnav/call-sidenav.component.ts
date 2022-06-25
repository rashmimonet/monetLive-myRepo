import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../shared/services/api.service';
import {BehaviourSubjectsService} from "../../../../services/behaviour-subjects.service";
import {UtilityService} from "../../../shared/services/utility.service";
import {debug} from "@amcharts/amcharts4/.internal/core/utils/Debug";

@Component({
  selector: 'app-call-sidenav',
  templateUrl: './call-sidenav.component.html',
  styleUrls: ['./call-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CallSidenavComponent implements OnInit, OnChanges {

  @ViewChild(MatAccordion) accordion?: MatAccordion;

  @Input() score: any;
  @Input() toggleSideNav: any;
  @Input() toggleSideNavfromStd: any;
  @Input() check: any;
  @Input() moduleName: any;
  @Input() set students(val: any) {
    //console.log(val);
    this.index++;
    this.tenSecondsAvg = [];
    if (val !== undefined)
    {
      for (const std of val) {
        std.engAvg  += std.engagement;
        this.updateCamOffList(std);
      }
      this.studentList = val.filter((a: any) => {
        return a?.uuid?.search('___') === -1 || a?.std_id?.search('___') === -1;
      });

      this.studentList.filter((v: any, i: any, a: any) => a.findIndex((t: any) => (t.std_id === v.std_id)) === i);
    }
  }

  @Output() selectUser = new EventEmitter();

  studentList: any;
  OS: any;
  tenSecondsAvg: any = [];
  tenSec = false;
  public test: any = [];
  searchStudentArr: any = [];
  search = new FormControl();
  selected: any = {
    fromSidenav : true,
  };
  index: any = 0;
  isStudent = false;
  yourId: any;
  filteredStudents?: Observable<string[]>;
  // Changes on 04/05/2022 Nitin Kumar
  metric: any = 0;
  camOffTab: any = [{name: 'Since Last On'}];
  // Changes on 04/05/2022 Nitin Kumar
  metricTab: any = [
    {name: 'Engagement', value: 'avgEngagement'},
    {name: 'Mood', value: 'avgMood'},
  ];
  callCat = [
    {name: 'Low', icon: '', text: 'Low', clas: 'title-danger12-400', color: `1px solid #DC3545`},
    {name: 'Medium', icon: '', text: 'Mid', clas: 'title-warning12-400', color: `1px solid #D69718`},
    {name: 'High', icon: '', text: 'High', clas: 'title-success12-400', color: `1px solid #00A23E`},
  ];

  constructor(private router: Router, public as: ApiService, private ar: ActivatedRoute, private bhvSub: BehaviourSubjectsService, private utility: UtilityService) {
    this.ar.queryParams.subscribe((next: any) => {
      if (next) {
        this.yourId = next.id;
      }
    });
    this.isStudent = window.location.href.search('student') !== -1 && window.location.href.search('report') === -1;
  }

  ngOnInit(): void {
    if (this.moduleName === 'report') {
      this.camOffTab[0].name = '';
    }
    this.bhvSub.obEngorMood(this.metric);
    this.filteredStudents = this.search?.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );
    this.OS = this.getOS();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.score) {
      if (changes?.score?.currentValue === 10) {
        this.tenSec = true;
      }
      else if (changes?.score?.currentValue === 0 || changes?.score?.currentValue === 1) {
        this.tenSec = false;
      }
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.studentList.filter(
      (std: any) => std.name
        .toLowerCase()
        .indexOf(filterValue) === 0)
      .map( (std: any) => std.name );
  }

  filterstudent(a: any, i: any): any {
    return !a.screen;
  }

  updateCamOffList(std: any): any {
    const userPresent = this.as.CamOffUsersArr.some((o: any) => o.id === std.std_id);
    if (!userPresent) {
      if (std.video === false) {
        this.as.CamOffUsersArr.push({id: std.std_id, time: new Date(), screenStat: std.video});
      }
    }
    else {
      if (std.video === true) {
        this.as.CamOffUsersArr = this.as.CamOffUsersArr.filter((user: any) => user.id !== std.std_id);
      }
    }
  }

  homeRoute(): void {
    if (!this.isStudent) {
      this.router.navigate(['report/dashboard'], {
        queryParams: {
          student_id: null
        },
        queryParamsHandling: 'merge'
      });
    }
  }

  selectStudent(std: any): void {
    if (this.selected === std) {
      this.selected =  {
        std_id: 0,
        fromSidenav: true
      };
    } else {
      this.selected = std;
      this.selected.fromSidenav = true;
    }
    this.selectUser.emit(this.selected);
   }

  trackByUsers(index: number, users: any): any {
    return users.std_id;
  }

  getOS(): any {
    const  platform = window.navigator.platform;
    const  macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const  windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    let  os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac';
    }  else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    }
    return os;
  }

  reportRoute(cat: any): void {
    if (this.moduleName === 'report' && !this.isStudent) {
      // this.router.navigate(['report/category-detail'], {queryParams: {catType: cat.name.toLowerCase()}, queryParamsHandling: 'merge'});
    }
  }

  // Changes on 04/05/2022 Nitin Kumar
  onChange(e: any): void {
    this.bhvSub.obEngorMood(e.value);
    this.metric = e.value;
  }

  screenOffStat(std: any): any {
    // console.log('Screen off stat');
     const user = this.as.CamOffUsersArr.filter((student: any) => {
       if (student.id === std.std_id) {
         return student.time;
       }
     });
     const diff = this.utility.getTimeDiff(new Date(user[0].time).getTime());
     return Math.floor(diff / 60) + ':' + ('0' + Math.floor(diff % 60)).slice(-2);
  }

}
