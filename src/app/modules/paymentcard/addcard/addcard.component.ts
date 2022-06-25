import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.scss'],
})
export class AddcardComponent implements OnInit {
  successPage = false;
  selectPlan: any;
  receiptUrl: any;
  constructor(private as: ApiService, private http: HttpClient) {}
  ngOnInit(): void {

    this.selectPlan = this.as.getLocalStorage('planUpgrade');
    const url = location.href.split('/');
    console.log(url[url.length - 1]);
    if (url[url.length - 1].split('?')[0] === 'paySuccess') {
      this.successPage = true;
     } else {
      this.successPage = false;
    }
  }
}
