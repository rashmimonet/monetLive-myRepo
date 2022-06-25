import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectionStatus',
})
export class SelectionStatusPipe implements PipeTransform {

  transform(usersArr: any, args: any): any {
    const length = JSON.parse(usersArr).filter((user: any) => user.action).length;
    if (args === 'approve') {
      return length < 1;
    }
    else if (args === 'selectAllButton') {
      return length < JSON.parse(usersArr).length;
    }
  }
}
