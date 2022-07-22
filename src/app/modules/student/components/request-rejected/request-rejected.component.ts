import { Component, OnInit } from '@angular/core';
import {LocationStrategy} from "@angular/common";
import { SocketService } from 'src/app/modules/shared/services/socket.service';
import { ScriptLoadService } from 'src/app/modules/shared/services/script-load.service';
declare let socket: any;

@Component({
  selector: 'app-request-rejected',
  templateUrl: './request-rejected.component.html',
  styleUrls: ['./request-rejected.component.scss']
})
export class RequestRejectedComponent implements OnInit {

  constructor(private location: LocationStrategy,
    private socketService: SocketService,
    private sl: ScriptLoadService,) {
    
  }

  ngOnInit(): void {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
    socket.close();
    this.socketService.disconnectSocket();
  }

}
