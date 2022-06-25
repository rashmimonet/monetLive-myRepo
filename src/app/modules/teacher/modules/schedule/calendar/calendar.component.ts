import {Component, OnInit, Output, EventEmitter, NgZone, OnChanges, SimpleChanges, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddEventComponent} from './add-event/add-event.component';

import {isSameDay, isSameMonth} from 'date-fns'; // useful for typechecking
import {Subject} from 'rxjs';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarMonthViewDay,
  CalendarView
} from 'angular-calendar';

import {ApiService} from '../../../../shared/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {ThirdPartyService} from '../../../../shared/services/third-party.service';
import {UtilityService} from "../../../../shared/services/utility.service";
import {HttpClient} from "@angular/common/http";
import {BehaviourSubjectsService} from "../../../../../services/behaviour-subjects.service";

declare let gapi: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [ApiService, ThirdPartyService]
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input() deleteEvent: any;
  @Output() eventList = new EventEmitter();
  @Output() outlookEventList = new EventEmitter();

  loggedInService: any = '';
  dynamicLink: any;
  params: any;
  selectedDays: any = [];
  checkDay: any;
  finalDateObj: any;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  date = new Date();
  viewDate: Date = new Date();
  // env = environment;
  actions: CalendarEventAction[] = [
    {
      label: 'edit',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: 'delete',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  outlookEvents: CalendarEvent[] = [];
  activeDayIsOpen = true;
  userDetails: any;
  email: any;
  meetingDuration: any;

  constructor(private dialog: MatDialog, private zone: NgZone, private api: ApiService, private route: ActivatedRoute, private tps: ThirdPartyService, private utility: UtilityService, private http: HttpClient, private bhvSub: BehaviourSubjectsService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((next: any) => {
      this.params = next;
    });
    this.bhvSub.dynamicLink$.subscribe((link: any) => {
      this.dynamicLink = link;
    });

    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.email = this.userDetails.email;

    this.api.getApiStatic(`userplanDetails?email=${this.email}`).subscribe((data: any) => {
      this.meetingDuration = data.data[0].meetingDuration;
    });

    this.refreshEvents();
  }

  ngOnChanges(sc: SimpleChanges): void {
    if (sc?.deleteEvent && sc.deleteEvent.currentValue) {
      this.deleteCalenderEvent(sc?.deleteEvent.currentValue);
    }
  }

  refreshEvents(): void {
    setTimeout(() => {
      if (this.tps.isLoggedIn().status) {
        this.loggedInService = this.tps.isLoggedIn().service;
        this.tps.isLoggedIn().service === 'google' ? this.listUpcomingGoogleEvents() : this.listOutlookEvents();
      } else {
        this.loggedInService = this.tps.isLoggedIn().service;
      }
    }, 5000);
    // this.setView(this.loggedInService);
  }

  async listUpcomingGoogleEvents(): Promise<any> {
    if (!localStorage.getItem('gapiAccessToken' || '')) {
      const events = await this.tps.getGoogleCalenderEvents();
      this.updateEvents(events);
    } else {
      gapi.auth.setToken({access_token: localStorage.getItem('gapiAccessToken' || '')}); // When user logged in through incognito mode
      const events = await this.tps.getGoogleCalenderEvents();
      this.updateEvents(events);
    }
  }

  updateEvents(events: any): void {
    // debugger
    const arr: any = [];
    events.forEach((ev: any) => {
      arr.push({
        start: new Date(ev.start.dateTime),
        end: new Date(ev.end.dateTime),
        attendees: ev.attendees,
        title: ev.summary
      });
    });
    this.events = arr;
    this.zone.run(() => {
      this.eventList.emit(arr);
    });
    return events;
  }

  /* handleSignoutClick(event: any): void {
     gapi.auth2.getAuthInstance().signOut();
   }
 */

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }, day: CalendarMonthViewDay): void {
    // debugger
    const dateVal = day.date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    const Year = day.date.getFullYear();
    const Month = day.date.toLocaleString('default', {month: 'short'});
    const upDate = new Date();
    const seconds = upDate.getSeconds();
    const minutes = upDate.getMinutes();
    const hour = upDate.getHours();
    const currentDayNum = day.date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.finalDateObj = new Date(`${days[currentDayNum].slice(0, 3)} ${Month} ${dateVal} ${Year} ${hour}:${minutes}:${seconds} GMT+0530 (India Standard Time)`);
    this.checkDay = day;
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    /* this.modalData = { event, action };
     this.modal.open(this.modalContent, { size: 'lg' });*/
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  addEvent(): void {
    const dialogRef = this.dialog.open(AddEventComponent, {
      data: {calDateSelect: this.finalDateObj},
      hasBackdrop: true,
      width: '500px',
      height: 'auto',
      maxHeight: '508px',
      backdropClass: 'backdropBackground'
    });
    dialogRef.afterClosed().subscribe(next => {
      if (next && next.form) {
        next.form.end = next.end;
        const emails: any = [];
        next.emails.map((m: any, i: number) => {
          emails[i] = {email: m.toString().trim()};
        });
        next.form.attendees = emails;
        this.generateVideoUrl(next).then((result: any) => {
        }).catch((error: any) => {
          // console.log('Mail not working', error);
        });
      }
    });
  }

  async deleteCalenderEvent(eventid: any): Promise<any> {
    if (this.loggedInService === 'google') {
      this.tps.deleteGoogleCalenderEvent(eventid, (res: boolean) => {
        if (res) {
          this.deleteEventFromDatabase(eventid, this.loggedInService);
        }
      });
    } else if (this.loggedInService === 'outlook') { // for deletion of events from Outlook Calender
      this.tps.outlookDeleteEvent(eventid).subscribe((res: any) => {
          if (res === null) {
            // console.log('Outlook Event Deleted Successfully');
          } else {
            // console.error('Outlook Event Could not be deleted');
          }
        },
        (error: any) => {
          console.error('Outlook Event Could not be deleted');
        });
      this.deleteEventFromDatabase(eventid, this.loggedInService);
    }
  }

  deleteEventFromDatabase(id: any, service: string): void { //  for deletion of event from database
    this.api.deleteApi(`room`, id).subscribe((result: any) => {
        ///console.log('Delete APi Response :', result);
        if (service === 'google') {
          this.listUpcomingGoogleEvents();
        } else if (service === 'outlook') {
          this.listOutlookEvents();
        }
      },
      ((error: any) => {
        console.error('Delete Api Error');
      }));
  }

  inviteRoom(data: any, eventId: any): void {
    data.attendee = data.attendees;
    data.creator = JSON.parse(localStorage.getItem('userDetails') || '').name,
    data.creator_ID = JSON.parse(localStorage.getItem('userDetails') || '').email;

// I added groupUid
      data.groupUid = JSON.parse(localStorage.getItem('userDetails') || '').plan.groupUid;
    data.sourceId = eventId;
    data.source = this.loggedInService;
    if (data.observerEmail) {
      data.instance = '';
      data.ip = '';
      data.observerLink = `${location.origin}/monitor?roomid=${data.roomid}&id=${new Date()}&grp=${data.instance}&instance=${data.ip}&summary=${data.summary}&duration=${JSON.parse(localStorage.getItem('userPlanDetails') || '{}').meetingDuration}`;
      
      // data.observerLink = `${location.origin}/monitor?roomid=${data.roomid}&id=${new Date()}&grp=${data.instance}&instance=${data.ip}&summary=${data.summary}&duration=${this.meetingDuration}`;
    } else {
      console.error('Dynamic Link and Instance could not be found');
    }
    data.scheduled = true;
    this.api.postApi1('inviteRoom', data).subscribe((next: any) => {
        if (next.error) {
          console.error('Invite Room API error :', next.message);
          this.utility.notify(next.message, '');
        } else {
          // console.log(next, 'data saved');
        }
      },
      (error: any) => {
        console.error('Invite Room API Error :', error);
      });
  }

  async generateVideoUrl(data: any): Promise<any> {
    // tslint:disable-next-line:variable-name
    const {name: creator, email: creator_ID, settings} = JSON.parse(localStorage.getItem('userDetails') || '');
    const postData = {
      source: this.loggedInService,
      creator, creator_ID, settings
    };
    this.http.post(`https://www.monetlive.com/${this.dynamicLink}/many/api/createCall`, postData).subscribe(async (next: any): Promise<any> => {
      if (next && !next.error) {
        // next.response.id = Math.floor(Math.random() * 1000000).toString();
        if (data.form.link === 'Monet Education') {
          // data.form.description = '<b>Please join the link below</b><br/>'
          //   + `https://www.monetlive.com/student/login?roomid=`
          //   + next.response.roomid + '&room=' + next.response.room + '<br/>'
          //   + data.form.description;
          // delete data.form.conferenceData.createRequest;
          data.form.description = '<b>Please join the link below</b><br/>'
            + `https://www.monetlive.com/student/login?roomid=`
            + next.response.roomid + '&room=' + next.response.room + '&matrixScore=' + JSON.parse(localStorage.getItem('userPlanDetails') || '{}').realTimeScores + '<br/>'
            + data.form.description;
          delete data.form.conferenceData.createRequest;
        }
        if (this.tps.isLoggedIn().status && this.tps.isLoggedIn().service === 'google') {
          const eventId = await this.tps.createGoogleCalenderEvent(data.form);
          this.inviteRoom({...next.response, ...data.form}, eventId);
          await this.listUpcomingGoogleEvents();
        } else if (this.tps.isLoggedIn().status && this.tps.isLoggedIn().service === 'outlook') {
          const attendees = data.emails.map((email: any) => {
            return {emailAddress: {address: email}};
          });
          this.tps.outlookCreateEvent(data.form.summary, data.form.body, data.form.start.dateTime, data.form.end.dateTime, attendees, data.form.description).subscribe((res: any) => {
            this.inviteRoom({...next.response, ...data.form}, res.id);
            this.listOutlookEvents();
          });
        } else {
          this.inviteRoom({...next.response, ...data.form}, '');
        }
      } else {
        console.error('Create Call Api Error :', next?.message);
      }
    });
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent, x: any): void {
    renderEvent.body.forEach((day) => {
      if (this.checkDay) {
        if (JSON.stringify(this.checkDay.date) == JSON.stringify(day.date)) {
          day.cssClass = 'bg-pink';
        }
      }
    });
  }

  listOutlookEvents(): void {
    this.tps.outlookGetEvents().subscribe((e: any) => {
      const arr: any = [];
      const events = e.value;
      events.forEach((ev: any) => {
        arr.push({
          start: new Date(ev.start.dateTime),
          end: new Date(ev.end.dateTime),
          attendees: ev.attendees,
          title: ev.subject
        });
      });
      this.outlookEvents = arr;
      this.outlookEventList.emit(arr);
    });
  }
}
