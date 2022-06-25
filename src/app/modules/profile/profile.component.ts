import { Component, OnInit } from '@angular/core';
import {ScriptLoadService} from '../shared/services/script-load.service';
import {SocketService} from "../shared/services/socket.service";
import {BehaviourSubjectsService} from "../../services/behaviour-subjects.service";
declare function fetchAvailableInstance(link: string | null, ip: string | null, callback: (e: { allotted: boolean }) => void): any;
declare var dynamoLink: any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ScriptLoadService, SocketService]
})
export class ProfileComponent implements OnInit {

  constructor(private sl: ScriptLoadService, private ss: SocketService, private bhvSub: BehaviourSubjectsService) {}

  ngOnInit(): void {
    this.sl.load('janus').then((user: any) => {
      this.sl.load('user').then((janus: any) => {
        if (user[0].loaded && janus[0].loaded) {
          if (dynamoLink === undefined) {
            // console.log('Dynamic link is undefined, calling fetchAvailableInstance now.');
            fetchAvailableInstance(null, null, (e) => {
              if (e?.allotted) {
                // console.log('Dynamic link assigned : ', dynamoLink);
                this.bhvSub.obDynamicLink(`${dynamoLink}`);
                this.ss.generateSocket();
                //this.ss.socket.emit('I-AM-ADMIN');
              }
            });
          }
          else {
            // console.log('Dynamic Link available :', dynamoLink);
            this.bhvSub.obDynamicLink(`${dynamoLink}`);
          }
        }
      });
    });

  }

}
