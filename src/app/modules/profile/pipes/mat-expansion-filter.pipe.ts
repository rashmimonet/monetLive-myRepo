import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matExpansionFilter',
})
export class MatExpansionFilterPipe implements PipeTransform {
  userPlanType = JSON.parse(localStorage.getItem('userDetails') || '').plan?.type;

  transform(tabName: unknown, ...args: unknown[]): any {
    if (args[0] === 'disable') {
      if (tabName !== 'my_meeting' && tabName !== 'setting') {
        return true;
      }
      else {
        return tabName === 'setting' && this.userPlanType === 'assigned';
      }
    }
    else if (args[0] === 'expand') {
      return (tabName === 'my_meeting' || (tabName === 'setting' && this.userPlanType === 'purchased'));
     /* if (tabName === 'my_meeting' || (tabName === 'setting' && this.userPlanType === 'purchased')) {
        return true;
      }*/
    }
  }

}
