import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScriptLoadService} from '../../shared/services/script-load.service';
import {ThirdPartyService} from '../../shared/services/third-party.service';
import {SocketService} from '../../shared/services/socket.service';
import {BehaviourSubjectsService} from '../../../services/behaviour-subjects.service';

declare function fetchAvailableInstance(link: string | null, ip: string | null, callback: (e: { allotted: boolean }) => void): any;
declare var dynamoLink: any;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],

  providers: [ScriptLoadService, ThirdPartyService, SocketService]

})
export class AuthenticationComponent implements OnInit {
  tabIndex: any = true;
  instanceStatus: any = false;
  termsCondition = true;
  rolePopup = false;
  token = { type: 'normal', value: '' };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private sl: ScriptLoadService,
              private tps: ThirdPartyService,
              private ss: SocketService,
              private bhvSub: BehaviourSubjectsService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((next: any) => {
      const href = window.location.href;
      const params = href.split('#')[1];
      let result;
      if (params && params !== '') { // for handling redirect done on google login in ingognito mode
        result = params.split('&').reduce( (res: any, item: string) => {
          const parts = item.split('=');
          res[parts[0]] = parts[1];
          return res;
        }, {});
        localStorage.setItem('gapiAccessToken', result.access_token);
      }
      if (next && next.licenseToken) {
        this.tabIndex = false;
        this.token.type = 'license';
        this.token.value = next.licenseToken;
        Object.assign({}, this.token);
        sessionStorage.setItem('licenseToken', JSON.stringify(this.token));
      }
     else if (result?.id_token) {
        this.tps.loginFunc({token: result.id_token}, 'auth/google');
      }
    });

    this.tps.rolePopup.subscribe((next: any) => this.rolePopup = next);

    this.sl.load('janus').then((user: any) => {
      this.sl.load('user').then((janus: any) => {
        if (user[0].loaded && janus[0].loaded) {
         if (fetchAvailableInstance) {
          fetchAvailableInstance(null, null, (e) => {
            if (e?.allotted) {
              this.instanceStatus = e.allotted;
              this.ss.generateSocket();
              // this.ss.socket.emit('I-AM-ADMIN');
            }
          });
         }
         else {
           console.error('FetchAvailable Instance not found');
         }
        }
      });
    });
  }

  tabChange(e: any): any {
    if (!e) {
      this.tabIndex = !e;
    }
  }

  login(service: string): void {
    if (dynamoLink && typeof(dynamoLink) !== 'function') {
      this.bhvSub.obDynamicLink(`${dynamoLink}`);
      if (service === 'google') {
        this.tps.googleLogIn((init: any) => {
          // console.log('thirdparty service',init);
        });
      }
      else if (service === 'outlook') {
        this.tps.outlookLogin();
      }
    }
    else {
      console.error('Dynamic Link not available');
    }
  }
}
