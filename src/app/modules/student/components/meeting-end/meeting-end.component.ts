import { Component, OnInit } from '@angular/core';
import {LocationStrategy} from "@angular/common";


@Component({
  selector: 'app-meeting-end',
  templateUrl: './meeting-end.component.html',
  styleUrls: ['./meeting-end.component.scss']
})
export class MeetingEndComponent implements OnInit {

  constructor(private location: LocationStrategy) {
  }

  ngOnInit(): void {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

}
