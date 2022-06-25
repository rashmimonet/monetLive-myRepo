import {Component, NgZone, OnInit} from '@angular/core';
import {ScriptLoadService} from '../../../shared/services/script-load.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {SocketService} from '../../../shared/services/socket.service';
import {ApiService} from '../../../shared/services/api.service';
import {BehaviourSubjectsService} from '../../../../services/behaviour-subjects.service';
import {UtilityService} from "../../../shared/services/utility.service";

declare function fetchAvailableInstance(link: string, ip: string): any;
declare var dynamoLink: any;


@Component({
  selector: 'app-manager-video',
  templateUrl: './manager-video.component.html',
  styleUrls: ['./manager-video.component.scss'],
  providers: [ScriptLoadService, DatePipe, ApiService]
})
export class ManagerVideoComponent implements OnInit {
  // params: any;
  dynamicLink: any;
  loaded = false;
  selectUser = false;
  duration = {
    time: '00:00:00',
    duration: 0
  };
  date = new Date();
  students: any = [];
  param: any;
  room: any;
  messagePanel: any = false;
  constructor(private sl: ScriptLoadService, private router: Router,
              private route: ActivatedRoute, private datePipe: DatePipe, public ss: SocketService,
              private api: ApiService, private zone: NgZone, private bhvSub: BehaviourSubjectsService, private utility: UtilityService) {
    /*this.route.queryParams.subscribe(m => {
      if (m) {
        this.param = m;
        this.getRoom(m.roomid);
      }
    });*/
  }
  ngOnInit(): void {
    this.sl.load('janus').then((user: any) => {
      this.sl.load('user').then((janus: any) => {
        if (user[0].loaded && janus[0].loaded) {
          // console.log('MonetConference.js Loaded !');
          this.route.queryParams.subscribe(next => {
            if (next) {
              this.param = next;
              this.dynamicLink = next.grp;
              // fetchAvailableInstance(`${next.grp}`, `${next.instance}`);
              this.ss.managerSocket(next.grp);
              this.bhvSub.obDynamicLink(next.grp);
              this.api.getApi(`verifyObserver?roomid=${next.roomid}`).subscribe((res: any) => {
                  if (!res.error){
                    this.getRoom(next.roomid);
                  }
                  else{
                    console.error('Error encountered in Verify observer API');
                    this.utility.notify(`${res.message}`, '');
                    this.router.navigate(['/auth']);
                  }
                },
                (err: any) => {
                  console.error('Verify Observer API error');
                });
            }
          });
        }

      });
    });
    const range = [{value: 30, cat: 'low'}, {value: 50, cat: 'average'}, {value: 70, cat: 'high'}];
    this.students.map((m: any) => {
      range.map((n: any) => {
        if (m.value >= n.value){
          m.cat = n.cat;
        }
      });
      return m;
    });
  }
  getRoom(roomid: any): void {
    this.api.getApi('getInviteRoom?roomid=' + roomid).subscribe(next => {
      if (next) {
        this.room = next.response;
        this.loaded = true;
      }
    });
  }
  getStudents(e: any): void {
    this.students = e;
    if (this.duration.duration === 0) {
      setInterval( () => {
        this.duration.duration++;
        this.duration.time = this.datePipe.transform(this.duration.duration * 1000, 'H:mm:ss', 'UTC') || '';
      } , 1000);
    }
  }
}
