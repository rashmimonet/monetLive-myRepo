import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../modules/shared/services/api.service';
import {BehaviourSubjectsService} from '../../services/behaviour-subjects.service';
import {MatDialog} from '@angular/material/dialog';
import {WaitingListComponent} from '../../modules/teacher/modules/waiting-list/waiting-list.component';
import {ScriptLoadService} from "../../modules/shared/services/script-load.service";
import {UtilityService} from "../../modules/shared/services/utility.service";


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  providers: [ApiService]
})
export class TopBarComponent implements OnInit, AfterViewInit {

  @ViewChild('waitingRoomAudio') waitingRoomAudio: any;

  @Input() waitingList: any;
  @Input() room: any;
  @Input() action: any;
  @Input() duration: any;
  @Input() role: any;

  @Output() toggleMenu: any = new EventEmitter();
  @Output() refreshSession = new EventEmitter();

  name: any;
  link: any;
  dialogOpener: any;
  waitingUsersList: any = [];

  constructor(private route: ActivatedRoute,
              public api: ApiService,
              private bhvSub: BehaviourSubjectsService,
              private dialog: MatDialog,
              private sl: ScriptLoadService, private utility: UtilityService) {
    route.queryParams.subscribe((next: any) => {
     this.name = next?.name?.slice(0, 1)?.toUpperCase() || 'T';
     //this.link = window?.location?.origin+ '/student/login?roomid=' + next?.roomid + '&room=' + next?.room;
     this.link = window?.location?.origin + '/student/login?roomid=' + next?.roomid + '&room=' + next?.room + '&matrixScore=' + JSON.parse(localStorage.getItem('userPlanDetails') || '{}').realTimeScores;
    });
  }

  ngOnInit(): void {
    this.sl.load('janus').then(() => this.sl.load('user').then(() => {}));

    this.bhvSub.fullScreen$.subscribe( (data: any) => {
      this.changeBackground(data);
    });
    this.bhvSub.waitingList$.subscribe( (data: any) => {
      this.waitingUsersList = data;
      if (data.length) {
        this.waitingRoomAudio.nativeElement.play();
        this.utility.notify('New user entered in waiting room', '');
      }
    });
  }

  ngAfterViewInit(): void {
    this.waitingRoomAudio.nativeElement.src = '../../../assets/waitingRoom.ogg';
  }

  changeBackground(val: any): any {
    const el = document.getElementById('topbar') as HTMLDivElement;
    el.style.background = val ? 'black' : 'rgba(0,0,0,0.4)';
  }

  Menu(val: any): void {
    this.toggleMenu.emit(val);
  }

  viewWaitingUsers(): void {
    this.dialogOpener = this.dialog.open(WaitingListComponent, {
      // data: { waitingUsers: this.waitingUsersList },
      panelClass: ['test-media-container', 'icon-outside'],
      hasBackdrop: true,
      width: '40%',
      height: 'auto',
      backdropClass: 'backdropBackground'
    }).afterClosed().subscribe((next: any) => {
      this.dialogOpener = null;
    });
  }

  refresh(): void {
    if (confirm("Are you sure you want to refresh ? \nRefreshing this call will restart the session again.")) {
      this.refreshSession.emit(true);
    } else {}

  }

}
