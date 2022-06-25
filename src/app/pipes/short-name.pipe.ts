import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName'
})
export class ShortNamePipe implements PipeTransform {

  transform(value: any, ...args: any): unknown {
    // const ar = Array.from(Array(args[0]).keys());
    let name = '';
    value.split(' ').map((sp: any, i: number) => {
      if (args[0] >= i) {
        name += sp[0];
      }
    });
    return name;
  }

}
