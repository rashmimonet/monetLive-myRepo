import { Injectable } from '@angular/core';
import {BehaviourSubjectsService} from "../../../services/behaviour-subjects.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";

declare let inSession: boolean;

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  dynamicLink: any = '';
  snackBarRef: any;
  snackbarState: boolean = false;

  constructor(private bhvSub: BehaviourSubjectsService, private snackBar: MatSnackBar, private date: DatePipe) {}

  getTimeDiff(screenOffTime: any): any {
    const currentTime = new Date().getTime();
    const secondBetweenTwoDate = Math.abs((currentTime - screenOffTime) / 1000);
    return Math.round(secondBetweenTwoDate);
  }

  notify(msg: string, action: any): void {

    if (inSession !== null && !this.snackbarState) {
      this.snackBar.open(msg, action, {
        duration: 3000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        panelClass: ['custom-snackbar'],
      });
      /*     if (this.snackBarRef !== undefined) {
             //console.log('notifyPermanent() not called yet');
           }
           else {
             this.snackBarRef?.afterDismissed().subscribe((res: any) => {
             //console.log('Snack Bar State 1 :', res);
           });
           }*/
    }
  }

  notifyPermanent(msg: string, action: any): void { // only used when call duration time limit is about to reach
    if (inSession !== null) {
      this.snackbarState = true;
      this.snackBarRef = this.snackBar.open(msg, action, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['custom-snackbar'],
      });
      this.snackBarRef?.afterDismissed().subscribe((res: any) => {
        // console.log('Snack Bar State  :', res);
        this.snackbarState = false;
      });
    }
  }

  convertDate(second: number, duration: number): string {
    return (this.date.transform(second * 1000,duration < 3600 ? 'mm:ss' : 'H:mm:ss','UTC') || '');
  }

  calculateDuration(datas: any): any {
    const data = datas.filter((d: any) => Object.keys(d).length);
    const arr: any = [];
    data.map((en: any) => {
      if (en?.session_data?.length) {
        arr.push(new Date(en.session_data[0].createdAt).getTime());
        arr.push(new Date(en.session_data[en.session_data.length - 1].createdAt).getTime());
      }
    });
    const end = arr.length > 0 ? Math.max(...arr) : 0;
    const start = arr.length > 0 ? Math.min(...arr) : 0;
    return { start, end, duration: (end - start) / 1000 };
  }

  getSegmentData(data: any): any {
    const arr: any = [];
    arr.push(new Date(data[0].createdAt).getTime());
    arr.push(new Date(data[data.length - 1].createdAt).getTime());
    const end = Math.max(...arr);
    const start = Math.min(...arr);
    return { start, end, duration: (end - start) / 1000 };
  }

  setCategory(val: any): string {
    return val === 0 ? 'camOff' : val > 80 ? 'High' : val > 40 ? 'Medium' : 'Low';
  }

  create_UUID(): any {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,  (c) => {
      // tslint:disable-next-line:no-bitwise
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

}
