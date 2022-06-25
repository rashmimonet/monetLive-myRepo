import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {SocketService} from "../../../shared/services/socket.service";

declare function fetchAvailableInstance(link: string, ip: string): any;

@Component({
  selector: 'app-call-not-started',
  templateUrl: './call-not-started.component.html',
  styleUrls: ['./call-not-started.component.scss']
})
export class CallNotStartedComponent implements OnInit {

  queryParamsSubscription: Subscription;
  urlParams: Params;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private socketService: SocketService, private router: Router) { }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.urlParams = params;
    });
  }

  getRoomIp(): void {
    this.apiService.getApiStatic(`getRoomIp?roomid=${this.urlParams.roomid}`).subscribe((ip: any) => {
      if (ip.room.grp) {
        fetchAvailableInstance(ip.room.grp, ip.room.instance);
        this.socketService.generateSocket();
        this.router.navigate(['student/login'], {queryParamsHandling: 'merge'});
      }
      else {
        return
      }
    });
  }

}
