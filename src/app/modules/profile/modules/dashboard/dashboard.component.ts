import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnChanges {
  scheduleEmit: any;
  json = JSON;

  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
        console.log('schedule emit data', this.scheduleEmit);
    }

  swicthTab(e: any): any {
    if (!e.OptionStatus) {
      this.router.navigate([`/profile/dashboard/${e.Name}/${e.To}`]).then().catch();
    }
    else if (e.OptionStatus) {
      this.router.navigate([`/profile/dashboard/${e.Name}/${e.To}/${e.OptionValue}/`]).then().catch();
    }
  }

  ngOnInit(): void {}

  x(e: any): void {
    this.scheduleEmit = e;
  }

}
