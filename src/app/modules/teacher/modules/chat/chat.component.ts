import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {SocketService} from '../../../shared/services/socket.service';
import {MatTabGroup} from "@angular/material/tabs";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges{

  @ViewChild('chatBox') chatBox?: ElementRef;
  @ViewChild('privateChatBox') privateChatBox?: ElementRef;
  @ViewChild('fileInput') fileInput?: ElementRef;
  @ViewChild('tabs', {static: false}) tabGroup!: MatTabGroup;
  // activateChatOption: boolean = JSON.parse(localStorage.getItem('userPlanDetails') || '{}').technicalSupport.search('Chat') !== -1;
  // activateChatOption: any;
  privateChat = false;
  selectedUser: any;
  studentList: any;
  messageList: any = [];
  attachmentList: any = [];
  message?: string;
  private selectedFile: any;
  @Output() badgeCount = new EventEmitter();
  @Output() messagePanelClose = new EventEmitter();
  @Output() messagePanelOpen = new EventEmitter();
  @Input() role!: string;
  @Input() param: any;
  @Input() messagePanel: any;
  @Input() set students(val: any) {
    if (val !== undefined)
    {
      this.studentList = val.filter((a: any) => {
        // this.activateChatOption = JSON.parse(localStorage.getItem('userPlanDetails') || '{}').technicalSupport.search('Chat') !== -1;
       /* if (this.activateChatOption && this.role === 'student') {
          return (a?.uuid?.search('___') === -1 || a?.std_id?.search('___') === -1) && (a?.std_id !== this.param.id) && (a?.proctor !== 'teacher');
        }*/
        // else {
          return (a?.uuid?.search('___') === -1 || a?.std_id?.search('___') === -1) && (a?.std_id !== this.param.id);
        // }
      });
      // console.warn('Students List (Chat): ', this.studentList);
    }
  }


  constructor(private ss: SocketService, private route: ActivatedRoute, private as: ApiService) {}

  getCurrentTime(): Date {
    const date = new Date();
    return date;
  }

  send(): void {
    // console.log('Group Message :', this.message);
    if (this.message?.trim().length !== 0) {
      this.messageList.push({msg: this.message, time: this.getCurrentTime(), self: true, name: this.param.name, receiver: 'Everyone', private: false, type: 'text'});
      this.ss.socket.emit('broadcast-message', {roomid: this.param.roomid, msg: this.message});
      this.message = '';
      this.scrollToTop();
    }
  }

  sendPrivateMsg(): void {
    // console.log('Private Message :', this.message);
    const {name, std_id} = this.selectedUser;
    if (this.message?.trim().length !== 0) {
      this.messageList.push({msg: this.message, time: this.getCurrentTime(), self: true, name: name, receiver: name, private: true, type: 'text'});
      this.ss.socket.emit('private-message', {name: name, msg: this.message, uuid: std_id});
      this.message = '';
      this.scrollToTop();
    }
  }

  sendFile(): void {
    // console.log('attach file button is pressed');
    const element = this.fileInput?.nativeElement;
  }

  onFileChanged(event: any): any {
    const formData = new FormData();
    this.selectedFile = event.target.files;
    for (let key of Object.keys(this.selectedFile)) {
      this.messageList.push({msg: this.selectedFile[key].name, time: this.getCurrentTime(), self: true, name: this.param.name, receiver: this.privateChat ? this.selectedUser.name : 'Everyone', private: false, type: 'attachment'});
      formData.append('files', this.selectedFile[key]);
    }
      this.as.postApi('upFile', formData).subscribe((res: any) => {
        console.log('Up File API response :', res);
        if (this.privateChat) {
          this.ss.socket.emit('downFile-user', {files: res.files, receiver_uuid: this.selectedUser.std_id});
        }
        else {
          this.ss.socket.emit('downFile-group', {files: res.files});
        }
      });

  }

  scrollToTop(): void {
    setTimeout(() => {
      const el = this.chatBox?.nativeElement;
      el.scrollTop = this.chatBox?.nativeElement.scrollHeight;
    }, 50);
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((next: any) => {
      this.param = next;
    });
    this.badgeCountFunction();
    setTimeout(() => {
      if (this.ss.socket) {
        this.ss.socket.onAny((eventName: any, data: any) => {
          this.socketEventListeners(eventName, data);
        });
      }
    }, 5000);
  }


  socketEventListeners(event: any, data: any): any {
    // console.warn(`event: ${event}, Data: ${data}`);
    switch (event) {
      case 'send-message': {
        if (data && data.msg && !data.self) {
          console.log(data);
          data.time = this.getCurrentTime();
          data.self = false;
          data.seen = this.messagePanel;
          data.receiver = 'Everyone';
          data.private = false;
          data.type = 'text'
          this.messageList.push(data);
          console.log(this.messageList);
          this.badgeCountFunction();
          this.scrollToTop();
        }
        break;
      }
      case 'private-send-message': {
        if (data && data.msg && !data.self) {
          // console.log(data);
          data.time = this.getCurrentTime();
          data.self = false;
          data.seen = this.messagePanel;
          data.private = true;
          data.receiver = 'You';
          data.type = 'text'
          this.messageList.push(data);
          console.log(this.messageList);
          this.badgeCountFunction();
          this.scrollToTop();
        }
        break;
      }
      case 'downFile-group': {
        this.ss.socket.on('downFile-group', (data: any) => {
          console.log('DownFile(group) -> listener :', data);
          data.files.forEach((el: any) => {
            const message = {
              msg: el.filename,
              time: this.getCurrentTime(),
              self: false,
              seen: this.messagePanel,
              receiver: 'Everyone',
              private: false,
              type: 'attachment',
              name: data.name,
            };
            this.messageList.push(message);
            this.badgeCountFunction();
            this.scrollToTop();
          });
        });
        break;
      }
      case 'downFile-user': {
        console.log('DownFile(user) -> listener :', data);
        data.files.forEach((el: any) => {
          const message = {
            msg: el.filename,
            time: this.getCurrentTime(),
            self: false,
            seen: this.messagePanel,
            receiver: 'You',
            private: true,
            type: 'attachment',
            name: data.name,
          };
          this.messageList.push(message);
          this.badgeCountFunction();
          this.scrollToTop();
        });
        break;
      }
    }
  }

  badgeCountFunction(): void {
    this.badgeCount.emit(this.messageList.filter((msg: any) => !msg.seen).length);
  }

  ngOnChanges(sc: SimpleChanges): any {
    if (sc?.messagePanel?.currentValue === true) {
      this.messageList = this.messageList.map((el: any) => {
        el.seen = true;
        return el;
      });
      this.badgeCountFunction();
    }
  }

  closeMessagePanel(): void {
    this.messagePanelClose.emit(false);
  }

  msgToUser(e: any): any {
    // console.log(e.value);
    if (e.value === 'Everyone') {
      this.privateChat = false;
    }
    else {
      this.privateChat = true;
      this.selectedUser = e.value;
    }
  }
}
