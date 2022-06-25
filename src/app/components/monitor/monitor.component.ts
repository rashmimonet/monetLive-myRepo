import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ApiService} from "../../modules/shared/services/api.service";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  providers: [ApiService]
})
export class MonitorComponent implements OnInit {
  params: any;
  message: any = '';
  constructor(private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private api: ApiService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => this.params = res);
  }

  monitor(): void {
    if (this.params.grp === '' && this.params.instance === '') {
      this.api.getApi(`getRoomIp?roomid=${this.params.roomid}`).subscribe((ip: any) => {
        if (ip.room.grp  && ip.room.instance) {
          const params = {
            grp: ip.room.grp,
            instance: ip.room.instance
          };
          this.router.navigate(['/manager/inspect'], {queryParams: params, queryParamsHandling: 'merge'});
        }
        else {
          const date = this.datePipe.transform(ip.room.start.dateTime, 'medium');
          this.message = `Meeting will start at : ${date}. Please wait or contact moderator.`;
        }
      });
    }
    else {
      this.router.navigate(['/manager/inspect'], {queryParamsHandling: 'merge'});
    }
  }

}
