import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (value) {
      const hh = Math.floor(value / 1000 / 60 / 60);
      value -= hh * 1000 * 60 * 60;
      const mm = Math.floor(value / 1000 / 60);
      value -= mm * 1000 * 60;
      return hh ? Math.abs(hh) + ' h, ' + mm + ' m' :  mm + ' Minutes';
    }
    return '0 Minutes';
  }

}
