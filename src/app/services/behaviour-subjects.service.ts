import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject } from 'rxjs';

interface WaitingList  {
  userName: string;
  userId: number;
  socketId: string;
}

@Injectable({
  providedIn : 'root'
})
export class BehaviourSubjectsService {

  constructor() {}

  /*// User deatils
  public userDetails = new BehaviorSubject(JSON.parse(String(localStorage.getItem('userDetails'))));
*/
  // ScreenShare
  public screenShare = new BehaviorSubject<any>(false);
  screenShare$ = this.screenShare.asObservable();

  // FullScreen
  public fullScreen = new BehaviorSubject<any>(false);
  fullScreen$ = this.fullScreen.asObservable();

  // Average Engagement Response (Reports Component)
  public avgEngRes = new BehaviorSubject<any>('');
  avgEngRes$ = this.avgEngRes.asObservable();

  // Waiting room users list (only for moderator)
  public waitingList = new BehaviorSubject<Array<WaitingList>>([]);
  waitingList$ = this.waitingList.asObservable();

  // Reports Data collection
  public reportsData = new BehaviorSubject<any>({});
  reportData$ = this.reportsData.asObservable();

  // Metric
  public engOrMood = new BehaviorSubject<any>('');
  engOrMood$ = this.engOrMood.asObservable();

  // Dynamic Link for API calls
  public dynamicLink = new BehaviorSubject<any>('');
  dynamicLink$ = this.dynamicLink.asObservable();

  // Check if face-data is being received or not
  public faceData = new BehaviorSubject<any>(true);
  faceData$ = this.faceData.asObservable();

  public obScreenShare(val: boolean): any {
    this.screenShare.next(val);
  }

  public obFullScreen(val: any): any {
    this.fullScreen.next(val);
  }

  public obAvgEngRes(val: any): any {
    this.avgEngRes.next(val);
  }

  public obAddToWaitingList(val: any): any {
    const currentList = this.waitingList.value;
    const updatedList = [...currentList, val];
    this.waitingList.next(updatedList);
  }

  public obRemoveFromWaitingList(val: any): any {
    const currentList = this.waitingList.value;
    const updatedList = currentList.filter((el: any) => {
      if (el.userId !== val.userId) {
        return el;
      }
    });
    this.waitingList.next(updatedList);
  }

  public obReportData(val: any): any {
    this.reportsData.next(val);
  }

  public obEngorMood(val: number): any {
    this.engOrMood.next(val);
  }

  public obDynamicLink(val: string): any {
    this.dynamicLink.next(val);
  }

  public obFaceData(val: string): any {
    this.faceData.next(val);
  }


}
