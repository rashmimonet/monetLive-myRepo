// import {Component, Input, OnInit} from '@angular/core';
// import {ApiService} from '../../../shared/services/api.service';
// import {ActivatedRoute, Router} from '@angular/router';
// import {BehaviourSubjectsService} from "../../../../services/behaviour-subjects.service";
// import { MatDialog } from '@angular/material/dialog';
// // import {PostProcessingService} from "../../../shared/services/post-processing.service";
//
// @Component({
//   selector: 'app-top-bar',
//   templateUrl: './top-bar.component.html',
//   styleUrls: ['./top-bar.component.scss']
// })
// export class TopBarComponent implements OnInit {
//   roomId: any;
//   engType: any;
//   metric: any;
//   attendees: any = 0;
//   userDetails: any;
//   room: any;
//   duration: any = 0;
//   @Input() students: any;
//   @Input() callDetails: any;
// /*  segmentControl: any = 1;
//   segmentDuration: any[] = [
//     {name: '1st hour', value: 1, selected: true},
//     // {name: '2nd hour', value: 2, selected: false}
//   ];
//   segChange(e: any): void {
//     // console.log(e);
//     this.segmentControl = e;
//   }*/
//   constructor(private api: ApiService,
//               private route: ActivatedRoute,
//               private bhvSub: BehaviourSubjectsService,
//               private router: Router,
//               public dialog: MatDialog) {
//     this.route.queryParams.subscribe(next => {
//       if (next) {
//         this.getRoom(next.roomid);
//       }
//     });
//     this.userDetails = JSON.parse(String(localStorage.getItem('userDetails')));
//   }
//   getRoom(roomid: any): void {
//     this.api.getApi('getInviteRoom?roomid=' + roomid).subscribe(next => {
//       if (next) {
//         this.room = next.response;
//       }
//     });
//   }
//
//   ngOnInit(): void {
//     this.route.queryParams.subscribe( (next: any) => {
//       if (next) {
//         this.roomId =  next.roomid;
//         // console.log('router data ', next)
//         // this.param = next;
//         // this.getDashboardData(JSON.parse(localStorage.getItem('reportData') || '{}'));
//         // if (JSON.parse(localStorage.getItem('avg-eng-res') || '[]') && this.segmentData.length === 0) {
//         //   this.createSegment(JSON.parse(localStorage.getItem('avg-eng-res') || '[]'));
//         // }
//       }
//     });
//     this.students = this.students?.filter((stu: any) => {
//       if (!stu.std_id.includes('___')) {
//         return stu;
//       }
//     });
//     this.attendees = this.students?.length;
//     if (this.callDetails?.duration > 0) {
//       this.duration = new Date(this.callDetails?.duration * 1000).toISOString().substr(14, 6);
//     }
//
//     this.bhvSub.engOrMood$.subscribe( (data: any) => {
//       this.metric = data;
//       this.engType = data === 0 ? 'Engagement' : 'Mood';
//     });
//   }
//   dashBoardFunc = () => {
//     this.router.navigate(['/profile/dashboard']);
//   }
//   logout(): void {
//     localStorage.clear();
//     sessionStorage.clear();
//     this.router.navigate(['/']);
//   }
//   openDialog(event: any){
//     this.router.navigateByUrl(`report/view-pdf?roomid=${this.roomId}`).then(data =>{
//     // console.log('Route Successfull');
//     }).catch(error =>{
//       console.error(error);
//     })
// }
// }
import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviourSubjectsService} from "../../../../services/behaviour-subjects.service";
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AssignmentComponent } from '../assignment/assignment.component';
import { isHidden } from '@amcharts/amcharts4/.internal/core/utils/DOM';
// import {PostProcessingService} from "../../../shared/services/post-processing.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  roomId: any;
  engType: any;
  metric: any;
  attendees: any = 0;
  userDetails: any;
  room: any;
  duration: any = 0;
  userId: any;
  @Input() students: any;
  @Input() callDetails: any;
  /*  segmentControl: any = 1;
    segmentDuration: any[] = [
      {name: '1st hour', value: 1, selected: true},
      // {name: '2nd hour', value: 2, selected: false}
    ];
    segChange(e: any): void {
      // console.log(e);
      this.segmentControl = e;
    }*/
  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private bhvSub: BehaviourSubjectsService,
              private router: Router,
              public dialog: MatDialog,
              private http: HttpClient,) {
    this.route.queryParams.subscribe(next => {
      if (next) {
        this.getRoom(next.roomid);
      }
    });
    this.userDetails = JSON.parse(String(localStorage.getItem('userDetails')));
  }
  getRoom(roomid: any): void {
    this.api.getApiStatic('getInviteRoom?roomid=' + roomid).subscribe(next => {
      if (next) {
        this.room = next.response;
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( (next: any) => {
      if (next) {
        this.roomId =  next.roomid;
        // console.log('router data ', next)
        // this.param = next;
        // this.getDashboardData(JSON.parse(localStorage.getItem('reportData') || '{}'));
        // if (JSON.parse(localStorage.getItem('avg-eng-res') || '[]') && this.segmentData.length === 0) {
        //   this.createSegment(JSON.parse(localStorage.getItem('avg-eng-res') || '[]'));
        // }
      }
    });
    this.students = this.students?.filter((stu: any) => {
      if (!stu.std_id.includes('___')) {
        return stu;
      }
    });
    this.attendees = this.students?.length;
    if (this.callDetails?.duration > 0) {
      this.duration = new Date(this.callDetails?.duration * 1000).toISOString().substr(14, 6);
    }

    this.bhvSub.engOrMood$.subscribe( (data: any) => {
      this.metric = data;
      this.engType = data === 0 ? 'Engagement' : 'Mood';
    });
  }
  dashBoardFunc = () => {
    this.router.navigate(['/profile/dashboard']);
  }
  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
  openDialog(event: any){
    this.router.navigateByUrl(`report/view-pdf?roomid=${this.roomId}`).then(data =>{

    }).catch((error: any) =>{
      console.error(error);
    })
  }
  openDialogBox(){
    const dialogRef = this.dialog.open(AssignmentComponent, { autoFocus: false, maxHeight: '100vh',minHeight: '100px', width: '50%', disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
  }
}
