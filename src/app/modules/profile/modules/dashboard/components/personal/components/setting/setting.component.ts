import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../../../../shared/services/api.service';
import {object, string} from '@amcharts/amcharts4/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviourSubjectsService} from '../../../../../../../../services/behaviour-subjects.service';
import {UtilityService} from "../../../../../../../shared/services/utility.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  settingsData!: FormGroup;
  adminId = JSON.parse(localStorage.getItem('userDetails') || '').email;
  constructor(private api: ApiService, private fb: FormBuilder, private utility: UtilityService) { }

  ngOnInit(): void {
    this.createForm();
    const data = JSON.parse(String(localStorage.getItem('userDetails'))).settings;
    data.limit = String(data?.limit);
    this.settingsData.patchValue(data);
  }

  createForm(): any {
    this.settingsData = this.fb.group({
      chat: [],
      limit: [],
      screenShare: [],
      waitingRoom: []
    });
  }

  updateSettings(): void {
    this.settingsData.value.limit = Number(this.settingsData.value.limit);
    // console.log('settings', this.settingsData.value);
    this.api.putApiStatic('updateSetting', {creator_ID: this.adminId, settings: this.settingsData.value }).subscribe((next: any) => {
      if (!next.error) {
        localStorage.setItem('userDetails', JSON.stringify(next.user));
        this.settingsData.patchValue(next.user);
        this.utility.notify(next.message, 'updated');
      } else {
        this.utility.notify(next.message, 'error');
      }
    });
  }
}
