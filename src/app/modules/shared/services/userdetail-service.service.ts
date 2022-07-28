import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserdetailServiceService {
  myDetailMethod$: Observable<any>;
  private myMethodSubject  = new BehaviorSubject<any>({});
  myTopMethod$: any;
  constructor() {
    this.myDetailMethod$ = this.myMethodSubject.asObservable();
   }
   myMethod(data: any){
    console.log('service user', data);
    this.myMethodSubject.next(data);
   }
}
