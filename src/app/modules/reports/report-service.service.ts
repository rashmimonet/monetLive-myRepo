import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  public _dataSource = new BehaviorSubject<boolean>(true);
  currentStatus$ = this._dataSource.asObservable();
  constructor() { }
  public changeStatus(status: boolean){
    this._dataSource.next(status)
  }
}
