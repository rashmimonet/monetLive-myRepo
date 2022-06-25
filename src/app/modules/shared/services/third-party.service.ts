import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {ScriptLoadService} from './script-load.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';
import {MsalService} from '@azure/msal-angular';
import {BehaviorSubject, Subscription} from 'rxjs';
import {UtilityService} from "./utility.service";

// Google API CREDENTIALS
declare var gapi: any;
const CLIENT_ID = '591973291813-2l1evk1ru95g6372u0r98i3oqmnrlng5.apps.googleusercontent.com';
const secret = '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';
const API_KEY = 'AIzaSyCWg8dY5ZZMaDZ4LDiDNQooF4Nc3CEqPuA';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar';

/*
const CLIENT_ID = '73d211eb-42b8-482a-952a-02a971bb6f76';
const TENANT = '5a7de3a4-f26f-4d7e-a0a6-a1b3c3e66543';
const REDIRECT_URI = 'http://localhost:4200';
*/


/* My Credentials */
/*const CLIENT_ID = '907725385874-liqb57j4r27q0her9i63rl33um36glce.apps.googleusercontent.com';
const secret = 'PcviYnjXLb5qm53uOG7S4NXY';
const API_KEY = 'AIzaSyAorAYgK4cE0DNGEIhXwaCjSbckZBSrIPk';*/

/* Monet Credentials */
/*const CLIENT_ID = '880808631517-jvm1taggmi52iujrgdts2s0i4prs221t.apps.googleusercontent.com';
const secret = 'BBLcFE-WHOLwmrhZMnVvxR7A';
const API_KEY = 'AIzaSyAzMtj6DNWbdwrf1MvLGYTkaGwtowJK1Jk';

const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/calendar';*/

/* {
  web:{
    client_id:'880808631517-jhrthafbffnhg6mov4l2nevgueig5aeb.apps.googleusercontent.com',
    project_id:'monet-edu','auth_uri':'https://accounts.google.com/o/oauth2/auth',
    token_uri:'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url:'https://www.googleapis.com/oauth2/v1/certs',
    client_secret:'gEZf8ZPr2Q4jF527p-W7hOfq',
    javascript_origins:[
      'https://dev.monetrewards.com',
      'http://localhost:4201',
      'https://www.monetrewards.com',
      'https://localhost:4200',
      'https://127.0.0.1:4200']
  }
} */

interface IsLoggedIn {
  status: boolean;
  service: string;
}

@Injectable()
export class ThirdPartyService {

  init = false;
  gData: any;
  headers: any;
  loaderStat = new BehaviorSubject(false);
  public rolePopup = new BehaviorSubject(false);
  msalServiceSubscription: Subscription;

  constructor(private router: Router,
              private sl: ScriptLoadService,
              private http: HttpClient,
              private as: ApiService,
              private msalService: MsalService,
              private zone: NgZone,
              private utility: UtilityService) {
    gapi.load('client:auth2', this.googleInitClient());
  }

  isLoggedIn(): IsLoggedIn {
    let statusObj = {status: false, service: ''};
    if (localStorage.getItem('GoogleLoginState') === 'true') {
      statusObj = {status: true, service: 'google'};
    } else if (this.msalService.instance.getActiveAccount() !== null) {
      statusObj = {status: true, service: 'outlook'};
    }
    else {
      statusObj = {status: false, service: 'monet'};
    }
    return statusObj;
  }

  tokenVerify(next: any): void {
    this.utility.notify(next.message, 'success');
    // console.log('Login Successful :', next);
    if (next && next?.user?.plan) {
      this.as.getApi(`getPlan?planId=${next.user?.plan.id}`).subscribe((res: any) => {
        localStorage.setItem('userPlanDetails', JSON.stringify(res?.plan));
      });
    }
    else {
      // console.warn('Plan Object missing in response');
    }
    this.sl.load('janus').then((user: any) => this.sl.load('user').then((janus: any) => user[0].loaded && janus[0].loaded));
    if (next?.user?.token) {
      this.as.storeLocalStorage('userDetails', next.user);
    }
    this.roleCheck(next);
  }

  roleCheck(next: any): void {
    this.zone.run(() => {
      if (next.user.userType !== 'NaN') {
        this.router.navigate([next.user?.userType === 'moderator' ? 'profile/dashboard/' : '/manager'], {
          queryParams: {name: next.user.name, licenseToken: null},
          queryParamsHandling: 'merge'
        });
      } else {
        this.rolePopup.next(true);
      }
    });
  }

  loginFunc(data: any, endpoint: string): any {
    this.http.post(`https://www.monetlive.com/many/api/${endpoint}`, data).subscribe(
      (next: any) => {
        this.loaderStat.next(false);
        if (!next.error) {
          this.tokenVerify(next);
        } else {
          this.utility.notify(next.message, 'error');
        }
      });
  }

  updateRole(data: any, endpoint: string): void {
    this.as.putApi('updateRole', data).subscribe(
      (next: any) => {
        if (!next.error) {
          this.tokenVerify(next);
        } else {
          this.utility.notify(next.message, 'error');
        }
      });
  }

// Google
  googleInitClient(): any {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
    });
  }

  googleLogIn(cb: any): void {
    // debugger
    gapi.load('client:auth2', () => {

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        gapi.auth2.getAuthInstance().signIn().then((res: any) => {
          // console.log('Google Login Response :', res);
          const licenseToken = JSON.parse(sessionStorage.getItem('licenseToken') || '{}').value;
          this.gData = res.Lu;
          if (licenseToken) {
            this.http.post(`https://www.monetlive.com/many/api/register-invited-user`, {token: res.xc.id_token, licenseToken, context: 'google'}).subscribe((next: any) => {
              // console.log('next', next);
              
              if (!next.error) {
                this.zone.run(() => {
                  this.as.storeLocalStorage('userDetails', next.user);
                  this.router.navigate(['profile/dashboard/'], {
                    queryParams: {name: next.user.name},
                    queryParamsHandling: 'merge'
                  });
                });
              }
            });
          }
          else {
            this.loginFunc({token: res.Cc.id_token}, 'auth/google');
          }
          this.init = true;
          localStorage.setItem('GoogleLoginState', 'true');
          cb(this.init);
        }).catch((error: any) => {
          // console.warn('Google Login error :', error);
        });
      }).catch((error: any) => {
        // console.warn('Google Login error (cookies not found) :', error);
        window.location.replace(this.getAuthUri());
      });
    });
  }

  async createGoogleCalenderEvent(formData: any): Promise<any> {
  const result = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      sendNotifications: true,
      sendUpdates: 'all',
      conferenceDataVersion: 1,
      resource: formData
    }).then((eve: any) => {
        // console.log('Event Created  Successfully: ', eve);
        return eve.result.id;
    },
    (error: any) => {
      console.error(error);
      return;
    })
  return result;
  }

  async getGoogleCalenderEvents(): Promise<any> {
    const date = new Date();
    const result = await gapi?.client?.calendar?.events?.list({
      calendarId: 'primary',
      timeMin: (new Date(date.getFullYear(), date.getMonth(), 1)).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 1000,
      orderBy: 'startTime'
    }).then((response: any) => {
        // console.log('Google Calender Events :', response);
        return response.result.items;
    },
    (error: any) => {
        console.error(error);
        return;
    })
    return result;
  }

  deleteGoogleCalenderEvent(eventid: any, cb: Function): void {
    gapi.client.load('calendar', 'v3', () => {
      const request = gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventid,
        sendNotifications: true,
        sendUpdates: 'all',
      });
      request.execute((response: any) => {
        if (response.error || response === false) {
          if (response?.error?.errors?.reason === 'deleted') {
            console.warn('Event has already been deleted');
          }
          else {
            // console.error('Gapi Delete error');
          }
          cb(false);
        }
        else{
          // console.log('Event Deleted Successfully');
          cb(true);
        }
      });
    });
  }

  getAuthUri(): string {
    localStorage.setItem('GoogleLoginState', 'true');
    let base = window.location.href;
    let state = '';
    const i = base.indexOf('authentication');
    if (i > -1) {
      state = base.substring(i);
      base = base.substring(0, i);
    }
    return (
      'https://accounts.google.com/o/oauth2/v2/auth' +
      '?client_id=' +
      encodeURIComponent(CLIENT_ID) +
      '&redirect_uri=' +
      encodeURIComponent(base) +
      '&response_type=' +
      encodeURIComponent('token id_token') +
      '&scope=' +
      encodeURIComponent('profile email openid https://www.googleapis.com/auth/calendar') +
      '&openid.realm' +
      '&include_granted_scopes=' +
      encodeURIComponent('true') +
      '&nonce=' + this.utility.create_UUID()
    );
  }

// Outlook
  getHeaders(): any {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('MSAL_TOKEN')}`
    });
    return this.headers;
  }

  outlookLogin(): boolean {
    const request = {
      scopes: ['Calendars.Read ' +
      'Calendars.ReadWrite ' +
      'Directory.Read.All ' +
      'Directory.ReadWrite.All ' +
      'User.Read ' +
      'User.Read.All ' +
      'User.ReadWrite ' +
      'User.ReadWrite.All ' +
      'profile openid email'],
      prompt: 'select_account',
    };
    this.msalService.loginPopup(request).subscribe((res: any) => {
        console.log('Outlook Login Successful :', res);
        const licenseToken = JSON.parse(sessionStorage.getItem('licenseToken') || '{}').value;
        if (licenseToken) {
          // this.http.post(`https://wrtc.monetanalytics.com/many/api/register-invited-user`, {token: res.wc.id_token, licenseToken, context: 'microsoft'}).subscribe((next: any) => {

          this.http.post(`https://www.monetlive.com/many/api/register-invited-user`, {token: res.wc.id_token, licenseToken, context: 'microsoft'}).subscribe((next: any) => {
            if (!next.error) {
              this.zone.run(() => {
                this.as.storeLocalStorage('userDetails', next.user);
                this.router.navigate(['profile/dashboard/'], {
                  queryParams: {name: next.user.name},
                  queryParamsHandling: 'merge'
                });
              });
            }
          });
        }
        else {
          this.loginFunc({token: res.accessToken}, 'auth/microsoft');
        }
        localStorage.setItem('MSAL_TOKEN', res.accessToken);
        this.msalService.instance.setActiveAccount(res.account);
      },
      ((error: any) => {
        console.error('Login Error :', error);
      }));
    return true;
  }

  outlookGetEvents(): any {
    return this.http.get(`https://graph.microsoft.com/v1.0/me/events?$select=subject,attendees,start,end`, {headers: this.getHeaders()});
  }

  outlookCreateEvent(Subject: string, Content: string, Start: any, End: any, Attendees: [], description: string): any {
    const event = {
      subject: Subject,
      body: {
        contentType: 'HTML',
        content: `<div fxLayout="row" fxLayoutAlign="start center">
                    <div style="background: #d9f2db">
                        <span style="font-weight: bold"><strong>You have been invited to the following event.</strong></span>
                    </div>
                    <h3>
                        <span style="color: #222; font-weight: bold; font-size: 16px;">${Subject}</span>
                    </h3>
                    <div fxLayout="column" fxLayoutAlign="center start">
                        <i style="font-style:normal; color: #888; margin-right: 30px;">When</i>
                        <span style="font-size: 13px; color: #222">${Start}</span>
                    </div>
                    <div fxLayout="column" fxLayoutAlign="center start">
                        <i style="font-style:normal; color: #888; margin-right: 11px;">Calender</i>
                        <span style="font-size: 13px; color: #222">${JSON.parse(localStorage.getItem('userDetails') || '').email}</span>
                    </div>
                    <div style="display: flex; flex-direction: row">
                        <i style="font-style:normal; font-size: 13px; color: #888; padding-top: 13px;">Who</i>
                        <div >
                            <ul>
                                ${Attendees.map((attendee: object) => `<li>${(Object.values(Object.values(attendee)[0])[0])} <span style="color: #888">${(Object.values(Object.values(attendee)[0])[0]) === JSON.parse(localStorage.getItem('userDetails') || '').email.toString() ? ' - Organizer' : ''}</span></li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div fxLayout="row">
                        ${description}
                    </div>
                  </div>`
      },
      start: {dateTime: Start, timeZone: 'Asia/Calcutta'},
      end: {dateTime: End, timeZone: 'Asia/Calcutta'},
      attendees: Attendees,
    };
    return this.http.post(`https://graph.microsoft.com/v1.0/me/calendar/events`, event, {headers: this.getHeaders()});
  }

  outlookDeleteEvent(eventId: any): any {
    return this.http.delete(`https://graph.microsoft.com/v1.0/me/calendar/events/${eventId}`, {headers: this.getHeaders()});
  }

}
