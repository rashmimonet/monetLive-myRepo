import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {SocketService} from '../../../shared/services/socket.service';
import {BehaviourSubjectsService} from '../../../../services/behaviour-subjects.service';
import {SelectionStatusPipe} from '../../../shared/pipes/selection-status.pipe';


@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss'],
  providers: [SelectionStatusPipe],
})
export class WaitingListComponent implements OnInit {
  responseArr: any = [];
  selectAllCheck = false;
  usersListForm: FormGroup;
  myjson: any = JSON;

  constructor(public dialogRef: MatDialogRef<WaitingListComponent>,
              private fb: FormBuilder,
              private ss: SocketService,
              private bhvSub: BehaviourSubjectsService) {
    this.usersListForm = fb.group({
      users: fb.array([]),
    });
  }

  get users(): FormArray {
    return this.usersListForm.get('users') as FormArray;
  }

  newUser(userName: any, userId: any, userAction: any, sid: any): FormGroup {
    return this.fb.group({
      name: userName,
      id: userId,
      action: userAction,
      socketId: sid
    });
  }

  addUser(name: any, id: any, action: any, socketId: any): void {
    this.users.push(this.newUser(name, id, action, socketId));
  }

  approveUser(i: number, user: any): void {
    this.users.removeAt(i);
    if (user !== null) {
      this.ss.socket.emit('join-response', {join: [{uuid: user.id, sid: user.socketId, confirmed: true}]});
      this.bhvSub.obRemoveFromWaitingList({userName: user.name, userId: user.id, socketId: null});
    }
    if (this.users.length < 1) {
      this.dialogRef.close();
    }
  }


  removeUser(i: number, user: any): void {
    this.users.removeAt(i);
    if (user !== null) {
      this.ss.socket.emit('join-response', {join: [{uuid: user.id, sid: user.socketId, confirmed: user.action}]});
      this.bhvSub.obRemoveFromWaitingList({userName: user.name, userId: user.id, socketId: null});
    }
  }

  action(i: number): void {
    const arrayControl = this.usersListForm.get('users') as FormArray;
    arrayControl.at(i).value.action = !arrayControl.at(i).value.action;
  }

  onSubmit(): void {
    // debugger
    this.usersListForm.value.users.forEach((el: any, index: any) => {
      // console.log('approve', el, this.action, index);
      
      if (el.action === true) {
        this.responseArr = [];
        this.removeUser(index, el);
        this.responseArr.push({uuid: el.id, sid: el.socketId, confirmed: el.action});
      }
    });
    this.ss.socket.emit('join-response', {join: this.responseArr});
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.bhvSub.waitingList$.subscribe((data: any) => {
      data.forEach((stu: any) => {
        const found = this.usersListForm.value.users.some((user: any) => user.id === stu.userId);
        if (found) {
           return;
        } else {
          this.addUser(stu?.userName, stu?.userId, false, stu?.socketId);
        }
      });
    });
  }

  checkSelectAllEqual(): boolean {
    return this.usersListForm.value.users.filter((user: any) => user.action).length !== this.usersListForm.value.users.length;
  }

  getFlexVal(): string {
    return `calc(${this.usersListForm.value.users.length * 4}vh)`;
  }

  selectAll(): void {
    if (this.checkSelectAllEqual()) {
      this.selectAllCheck = !this.selectAllCheck;
    }
    else {
      this.selectAllCheck = false;
    }
    this.usersListForm.value.users.forEach((user: any) => user.action = this.selectAllCheck);
  }

}
