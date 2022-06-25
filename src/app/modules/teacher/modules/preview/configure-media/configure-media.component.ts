import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocketService } from 'src/app/modules/shared/services/socket.service';
import { ScriptLoadService } from 'src/app/modules/shared/services/script-load.service';

@Component({
  selector: 'app-configure-media',
  templateUrl: './configure-media.component.html',
  styleUrls: ['./configure-media.component.scss'],
  providers: [ScriptLoadService],
})
export class ConfigureMediaComponent implements OnInit {
  selectedOption: object = {
    label: '',
    id: ''
  };
  settings: any = [
    {
      icon: 'speaker',
      name: 'Mic',
      action: '',
      content: 'Tab one content'
    },
    {

      icon: 'mic',
      name: 'Speaker',
      action: '',
      content: 'Tab one content'
    },
    {
      icon: 'videocam',
      name: 'Camera',
      action: '',
      content: 'Tab two content'
    },
    ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfigureMediaComponent>, public ss: SocketService, private sl: ScriptLoadService) { }

  ngOnInit(): void {
    this.ss.generateSocket();
    // console.warn('Socket :', this.ss.socket);
    this.sl.load('janus').then((user: any) => {
      this.sl.load('user').then((janus: any) => {
        if (user[0].loaded && janus[0].loaded) {
        }
      });
    });
    // console.warn('Dialog data :', this.data.devicesList);
  }

  selectDevice(val: any): any {
    const {id, label} = this.data.devicesList.filter((el: any) => {
      if (el.id === val.value) {
        return el;
      }
    })[0];
    this.selectedOption = {label, id};
  }

}
