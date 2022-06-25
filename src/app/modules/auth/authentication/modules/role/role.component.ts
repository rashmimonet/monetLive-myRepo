import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../../../../shared/services/api.service';
import {ThirdPartyService} from '../../../../shared/services/third-party.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  adminId = JSON.parse(localStorage.getItem('userDetails') || '').email;
  role = 'moderator';
  loader = false;

  constructor(private router: Router, private api: ApiService, private tps: ThirdPartyService) {
  }

  ngOnInit(): void {}

  onSubmit = () => {
    this.loader = true;
    this.tps.updateRole({userType: this.role, email: this.adminId}, 'updateRole');
    // this.gpi.signUpFunc(this.role);
  }

}
