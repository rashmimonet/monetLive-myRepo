import { Component, OnInit } from '@angular/core';
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-request-rejected',
  templateUrl: './request-rejected.component.html',
  styleUrls: ['./request-rejected.component.scss']
})
export class RequestRejectedComponent implements OnInit {

  constructor(private location: LocationStrategy) {
  }

  ngOnInit(): void {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

}
