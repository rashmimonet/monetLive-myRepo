import {Injectable} from '@angular/core';

@Injectable()
export class DashboardService {

  constructor() {}

  SecArrToMinuteArr(arr: any): any { // for converting second wise data to minute wise
    const minArr: any = [];
    let index = 0;
    let engScore = 0;
    let moodScore = 0;
    const n = arr.length;                                                                                      // Number of Data Points
    const m = this.diff_minutes(new Date(arr[0].timestamp), new Date(arr[arr.length - 1].timestamp)).minutes;  // Total Minutes
    const s =  this.diff_minutes(new Date(arr[0].timestamp), new Date(arr[arr.length - 1].timestamp)).seconds; // leftover Seconds
    const t = ((60 * m) + s) / 60;
    const pntsPerMin = Math.round(n / t);
    arr = arr.map((el: any, i: any) => {
      engScore += el.average_engagement;
      moodScore += el.average_mood;
      if (i % pntsPerMin === 0) {
        minArr.push({segment: index++, average_engagement: Math.round(engScore / pntsPerMin), average_mood: Math.round(moodScore / pntsPerMin)});
        engScore = 0;
        moodScore = 0;
      }
    });
    return minArr;
  }

  diff_minutes(dt1: any, dt2: any): any // return difference in minutes
  {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    let remainder = (dt2.getTime() - dt1.getTime()) / 1000;
    remainder %= 60;
    diff /= 60;
    return {minutes: Math.abs(Math.floor(diff)), seconds: Math.round(remainder)};
  }

  updateArr(loopVal: number, selection: number, dashInstance: any): any { // calcPercentage() -> calculation of percentages
debugger
    if (loopVal === 0 || loopVal === 3) {
      const args = [dashInstance.pieChartData[selection].hi_percentage[loopVal].toFixed(2),
        dashInstance.pieChartData[selection].med_percentage[loopVal].toFixed(2),
        dashInstance.pieChartData[selection].low_percentage[loopVal].toFixed(2)];

      if (loopVal === 0) {
        // dashInstance.percentArr.push(...args);
        dashInstance.percentArr = args;
        console.log('service eng', dashInstance.percentArr);
        return args;
      }
      else if (loopVal === 3) {
        // dashInstance.moodpercentArr.push(...args);
        dashInstance.moodpercentArr = args;
        console.log('service mood', dashInstance.moodpercentArr);
        return args;
      }
    }
    else if (loopVal === 1 || loopVal === 2) {
      const args = [dashInstance.pieChartData[selection].hi_percentage[loopVal].uuid.length ? dashInstance.pieChartData[selection].hi_percentage[loopVal].uuid.length : 0,
        dashInstance.pieChartData[selection].med_percentage[loopVal].uuid.length ? dashInstance.pieChartData[selection].med_percentage[loopVal].uuid.length : 0,
        dashInstance.pieChartData[selection].low_percentage[loopVal].uuid.length ? dashInstance.pieChartData[selection].low_percentage[loopVal].uuid.length : 0];

      if (loopVal === 1) {
        //  dashInstance.segUsersArr.push(...args);
        dashInstance.segUsersArr = args;
        console.log('service eng count', dashInstance.segUsersArr);
        
        return args;
      }
      else if (loopVal === 2) {
        //  dashInstance.moodsegUsersArr.push(...args);
        dashInstance.moodsegUsersArr = args;
        console.log('service mood count', dashInstance.moodsegUsersArr);
        return args;
      }
    }
  }
}
