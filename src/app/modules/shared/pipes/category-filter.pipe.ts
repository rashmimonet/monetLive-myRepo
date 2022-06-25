import { Pipe, PipeTransform } from '@angular/core';

interface Args {
  category?: string;
  category_engagement?: string;
  category_mood?: string;
  webcam?: string;
  config?: string;
  value?: boolean;
  key?: string;
  deviceType?: string;
  metric?: number;
}

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(value: unknown[], ...args: Args[]): any {
    if (args[0].config) {
      return value.filter( (a: any) => a['' + args[0].config] === args[0].value);
    }
    else if
    (args[0].category && args[0].category !== 'webcam')
     //(("category_engagement" in args[0] && args[0].category_engagement !== 'webcam') || ("category_mood" in args[0] && args[0].category_mood !== 'webcam'))
    {
      //console.log('args0', args[0].category)
      // console.log('temp1 before', value);
      // const key = args[0].key ? args[0].key : 'category_mood';
      // const temp1 = value.filter( (a: any) => a[key] === args[0].category_engagement);
      // //console.log('temp1 after', temp1);
      // return value;
      if('metric' in args[0] && args[0].metric === 0) {
        return value.filter( (a: any) => a['category_engagement'] === args[0].category);
      }
      if('metric' in args[0] && args[0].metric === 1) {
        return value.filter( (a: any) => a['category_mood'] === args[0].category);
      }
    }
    else if (args[0].webcam) {
      const key = args[0].key ? args[0].key : 'webcam';
      value.forEach((user: any) => {
        const isElementPresent = user.session_data.some((o: any) => o.webcam === 0);
        user.webcam = isElementPresent ? false : true;
      });
      return value.filter( (a: any) => a[key] === false);
    }
    else if  (args[0].deviceType) {
      const key = args[0].key ? args[0].key : 'type';
      if (value.filter( (a: any) => a[key] === args[0].deviceType).length) {
      return value.filter( (a: any) => a[key] === args[0].deviceType);
      }
      else {
        return [{label: 'No Device Detected', type: args[0].key}];
      }
    }
  }

}
