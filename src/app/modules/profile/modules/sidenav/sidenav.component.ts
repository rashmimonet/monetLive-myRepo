import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnChanges {
  selectedTab: any = 0;
  displOptions: any = false;
  @Input() updateSideNav: any;
  @Input() set scheduleEmit(val: any) {
   console.log(val);
  }
  @Output() switchTab = new EventEmitter();

  tabs = [
    {
      tabType: 'Personal',
      value: 'personal',
      tabName: [
        {
          Name: 'Account',
          value: 'account',
          Options: [{
            Name: 'Account options',
            value: 'account_options',
            status: false
          }],
          Status: false
        },
        {
          Name: 'My Meeting',
          value: 'my_meeting',
          Options: [{
            Name: 'Schedule Meeting',
            value: 'schedule',
            status: false
          }],
          Status: true                                      //true to false changed
        },
        {
          Name: 'Reports',
          value: 'reports',
          Options: [{
            Name: 'Recording Options',
            value: 'recording_options',
            status: false
          }],
          Status: false
        },
        {
          Name: 'Setting',
          value: 'setting',
          Options: [{
            Name: 'Assign License',
            value: 'license',
            status: false
          }],
          Status: false
        },
        {
          Name: 'Plan',
          value: 'plan',
          Options: [{
            Name: 'Plan Options',
            value: 'plan_options',
            status: false
          }],
          Status: false
        },
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.updateSideNav && changes?.updateSideNav.currentValue?.status === true) {
     this.tabs[0].tabName[1].Options[0].status = this.displOptions = true;
    }
  }

  nav(tabType: any, tabVal: any, tabNumber: any, tabIndex: any, tabOption: any, tabOptionIndex: number): void {
    // debugger
    // console.log(tabType, tabVal, tabNumber, tabIndex, tabOption, tabOptionIndex);
    this.selectedTab = tabIndex;
    this.tabs[0].tabName.map((tab: any) => { 
      if (tab.value === tabVal) {
        tab.Status = !tab.Status;
        // console.log('status', tab.Status);
        
        if (tabOption !== false) {
          tab.Options[0].status = !tab.Options[0].status;
          // console.log('options', tab.Options[0].status);
          
        }
      }
      else {
        tab.Status = tab.Options[0].status = false;
      }
    });
    this.switchTab.emit({Name: tabType, To: tabVal, OptionStatus: tabOption, OptionValue: this.tabs[0].tabName[tabNumber].Options[tabOptionIndex].value});
  }
}
