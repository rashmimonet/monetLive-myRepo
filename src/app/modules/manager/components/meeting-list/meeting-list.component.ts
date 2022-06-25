import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../shared/services/api.service';
import {animate, sequence, state, style, transition, trigger} from '@angular/animations';
import {ThirdPartyService} from '../../../shared/services/third-party.service';

const fadeOut =
    trigger('fadeOut', [
        state('void', style({
            background: 'pink',
            borderBottomColor: 'pink',
            opacity: 0,
            transform: 'translateX(-550px)',
            'box-shadow': 'none'
        })),
        transition('void => *', sequence([
            animate('.5s ease')
        ])),
        transition('* => void', [animate('.5s ease')])
    ]);

@Component({
    selector: 'app-meeting-list',
    templateUrl: './meeting-list.component.html',
    styleUrls: ['./meeting-list.component.scss'],
    providers: [ApiService, ThirdPartyService],
    animations: [fadeOut],
})


export class MeetingListComponent implements OnInit {
    selectedTab: any = `Ongoing`;
    loggedInService = '';
    currentTab: any = [];
    public demo1TabIndex = 1;
    date = new Date().getTime();
    math = Math;
    meetingType = [
        {
            type: 'upcoming',
            tabName: 'Upcoming Calls',
            name: 'Upcoming meets',
            button: 'View Meeting',
        },
        {
            type: 'ongoing',
            tabName: 'Ongoing Calls',
            name: 'Ongoing Meets',
            button: 'Monitor',
        },
        {
            type: 'past',
            tabName: 'Past Calls',
            name: 'Past Meets',
            button: 'View Report',
        }
    ];
    meetings: any[] = [];
    displayedColumns: string[] = ['TITLE', 'CREATOR', 'START IN', 'INVITED', 'ACTION'];

    constructor(private route: Router,
                private api: ApiService,
                private activatedRoute: ActivatedRoute,
                private tps: ThirdPartyService,
                private zone: NgZone) {
    }

    ngOnInit(): void {
        this.loggedInService = this.tps.isLoggedIn().service;
        if (this.tps.isLoggedIn().status) {
            // this.loggedInService = this.tps.isLoggedIn().service;
            const postData = {
                email: JSON.parse(localStorage.getItem('userDetails') || '').email,
                source: this.loggedInService
            };
            this.api.postApi('getAllInviteRooms', postData).subscribe(next => {
                this.getRooms(next.response.reverse());
            });
        } else {
            // console.log('User not Logged IN with any of the two Services');
        }
    }

    getRooms(meetings: any): void {
        const data = meetings.filter((item: any) => {
            return item.summary;
        });
        this.meetingType.map((n: any, i: number) => {
            let som = i === 0 ? data.filter((m: any) => new Date(m.start.dateTime).getTime() > new Date().getTime()) :
                i === 1 ? data.filter((m: any) => (new Date(m.start.dateTime).getTime() < new Date().getTime())
                    && (new Date(m.end.dateTime).getTime() > new Date().getTime())) :
                    data.filter((m: any) => new Date(m.end.dateTime).getTime() < new Date().getTime());
            som = som.map((modify: any) => {
                modify.start = new Date(modify.start.dateTime);
                modify.end = new Date(modify.end.dateTime);
                return modify;
            });
            this.meetings.push({
                    ...n,
                    meets: som
                }
            );
        });
        this.currentTab = this.meetings[1];
        // console.warn('Meetings :', this.meetings);
    }

    getLabel(tab: any, index: any): any {
        this.selectedTab = tab.target.innerText;
        this.currentTab = this.meetings[index];
        this.demo1TabIndex = index;
        // console.log('Current tab :', this.currentTab);
    }

    viewReport(event: any, index: any): void {
        const route = this.currentTab.type === 'past' ? 'report/dashboard' : 'manager/inspect';
        this.route.navigate([route], {
            queryParams: {roomid: this.currentTab.meets[index].roomid, id: new Date()},
            queryParamsHandling: 'merge'
        });
    }

    OutlookLogin(): void {
      if (this.tps.outlookLogin()) {
            this.loggedInService = 'outlook';
            const postData = {
                email: JSON.parse(localStorage.getItem('userDetails') || '').email,
                source: this.loggedInService
            };
            // this.api.postApi('getAllInviteRooms', postData).subscribe(next => {
                this.api.postApi1('getAllScheduleInviteRooms', postData).subscribe(next => {
                this.getRooms(next.response.reverse());
            });
        }
      }

    GoogleLogin(): void {
        this.tps.googleLogIn((init: any) => this.zone.run(() => {
            if (init) {
                this.loggedInService = 'google';
                const postData = {
                    email: JSON.parse(localStorage.getItem('userDetails') || '').email,
                    source: this.loggedInService
                };
                // this.api.postApi('getAllInviteRooms', postData).subscribe(next => {
                    this.api.postApi1('getAllScheduleInviteRooms', postData).subscribe(next => {
                    this.getRooms(next.response.reverse());
                });
            }
        }));
    }

  logout(): void {
      localStorage.clear();
      sessionStorage.clear();
      this.route.navigate(['/']);
  }
}
