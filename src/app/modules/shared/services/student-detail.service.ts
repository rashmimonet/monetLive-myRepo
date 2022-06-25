/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {UtilityService} from "./utility.service";

@Injectable({
  providedIn: 'root'
})
export class StudentDetailService {
  sessionData: any = {
    overAllSessionMins: [],
    overAllSessionSeconds: [],
    userSessionMins: [],
    userSessionSeconds: [],
    mergedDataSecWise: [],
    mergedDataMinWise: []
  };
  gap: any = 0;

  constructor(private as: ApiService, private utility: UtilityService) { }

  getCompiledData(overAllData: any, userData: any, screenShareData: any): any {
    // console.log(screenShareData);
    if (screenShareData) {
      // console.log('ScreenShare Start Time : ', new Date(screenShareData.video_start));
      // console.log('User Stream Start Time : ', new Date(userData[0].createdAt));
      this.gap = (new Date(screenShareData.video_start).getTime() - new Date(userData[0].createdAt).getTime()) / 1000;
    }
    overAllData = overAllData.map((el: any, i: any) => {
      el.segment = i + 1;
      return el;
    });
    this.sessionData.overAllSessionSeconds = this.findClosestDate(userData[0].createdAt, userData[userData.length - 1].createdAt, overAllData);
    this.sessionData.overAllSessionMins = this.secToMin_overAll(overAllData);
    this.sessionData.userSessionSeconds = userData;
    this.sessionData.userSessionMins = this.secToMin_user(userData);
    // {}{} => ^ for user, {}{} => v for overall
    this.sessionData.mergedDataSecWise = this.sessionData.overAllSessionSeconds.map((item: any, i: any) => Object.assign({}, item, this.sessionData.userSessionSeconds[i])).filter((el: any) => {
      if (el.createdAt) {
        return el;
      }
    });
    this.sessionData.mergedDataMinWise = this.equaliseMin_Sec_length(this.sessionData.userSessionMins,   this.sessionData.overAllSessionMins);
    // return this.sessionData;
    const {mergedDataSecWise, mergedDataMinWise} = this.sessionData;
    return {mergedDataSecWise, mergedDataMinWise};
  }

// ----------------------conversion for overall session data start ------------------------------------
  secToMin_overAll(data: any): any {
    const minArr: any = [];
    let index = 0;
    let engScore = 0;
    let moodScore = 0;
    const n = data.length;
    const m = this.diff_minutes(new Date(data[0].timestamp), new Date(data[data.length - 1].timestamp)).minutes;
    const s =  this.diff_minutes(new Date(data[0].timestamp), new Date(data[data.length - 1].timestamp)).seconds;
    const t = ((60 * m) + s) / 60;
    const pntsPerMin = Math.round(n / t);
    data.map((el: any, i: any) => {
      engScore += el.average_engagement;
      moodScore += el.average_mood;
      if (i % pntsPerMin === 0) {
        minArr.push(
          {
            segment: index++,
            average_engagement: Math.round(engScore / pntsPerMin),
            average_mood: Math.round(moodScore / pntsPerMin),
            category: this.utility.setCategory(Math.round(engScore / pntsPerMin)),
            moodCategory: this.utility.setCategory( Math.round(moodScore / pntsPerMin)),
          }
        );
        engScore = 0;
        moodScore = 0;
      }
    });
    return minArr;
  }
// ----------------------conversion for overall session data end --------------------------------------

// ----------------------conversion for user session data start ---------------------------------------
  secToMin_user(data: any): any {
    const minArr: any = [];
    let index = 0;
    let engScore = 0;
    let moodScore = 0;
    const n = data.length;                                                                                        // Number of Data Points
    const m = this.diff_minutes(new Date(data[0].createdAt), new Date(data[data.length - 1].createdAt)).minutes;  // Total Minutes
    const s =  this.diff_minutes(new Date(data[0].createdAt), new Date(data[data.length - 1].createdAt)).seconds; // leftover Seconds
    const t = ((60 * m) + s) / 60;
    const pntsPerMin = Math.round(n / t);
    data = data.map((el: any, i: any) => {
      engScore += el.engagement;
      moodScore += el.mood;
      if (i % pntsPerMin === 0) {
        minArr.push(
          {
            segment: index++,
            engagement: Math.round(engScore / pntsPerMin),
            mood: Math.round(moodScore / pntsPerMin),
            category: this.utility.setCategory(Math.round(engScore / pntsPerMin)),
            moodCategory: this.utility.setCategory( Math.round(moodScore / pntsPerMin)),
          }
        );
        engScore = 0;
        moodScore = 0;
      }
    });
    return minArr;
  }
// ----------------------conversion for user session data end ---------------------------------------

  diff_minutes(dt1: any, dt2: any): any
  {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    let remainder = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    remainder %= 60;
    return {minutes: Math.abs(Math.floor(diff)), seconds: Math.round(remainder)};
  }


  findClosestDate(startDate: any, endDate: any, data: any): any {
    if (data) {
      let segmentVal: any = 1;
      data.map((el: any) => {
        el.diffFromStart = (Math.abs((new Date(el.timestamp).getTime() - new Date(startDate).getTime()) / 1000));
        el.diffFromEnd = (Math.abs((new Date(el.timestamp).getTime() - new Date(endDate).getTime()) / 1000));
      });

      const nearestStartFrame = data.reduce((prev: any, curr: any) => {
        return prev.diffFromStart < curr.diffFromStart ? prev : curr;
      });

      const nearestEndFrame = data.reduce((prev: any, curr: any) => {
        return prev.diffFromEnd < curr.diffFromEnd ? prev : curr;
      });

      return data.filter((el: any, i: any) => { // cropped overall data
        if (el.timestamp >= nearestStartFrame.timestamp && el.timestamp <= nearestEndFrame.timestamp) {
          el.overallsegment = segmentVal++;
          return el;
        }
      });

 /*     let croppedOverAllData = data.filter((el: any, i: any) => {
        if (el.timestamp >= nearestStartFrame.timestamp && el.timestamp <= nearestEndFrame.timestamp) {
          el.overallsegment = segmentVal++;
          return el;
        }
      });
      return croppedOverAllData;*/
    }
  }

  equaliseMin_Sec_length(userData: any, overallData: any): any {
    // @ts-ignore
    const results = overallData.filter(({segment: id1}) => !userData.some(({segment: id2}) => id2 === id1));
    overallData = overallData.filter((val: any) => !results.includes(val));
    return overallData.map((item: any, i: any) => Object.assign({}, item, this.sessionData.userSessionMins[i]));
   /* const mergerdResult = overallData.map((item: any, i: any) => Object.assign({}, item, this.sessionData.userSessionMins[i]));
    return mergerdResult;*/
  }
}
