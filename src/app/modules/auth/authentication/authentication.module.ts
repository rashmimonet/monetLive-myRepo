import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {AuthenticationComponent} from './authentication.component';
import {RegisterModule} from './modules/register/register.module';
import {LoginModule} from './modules/login/login.module';
import {MatButtonModule} from '@angular/material/button';
import { RoleComponent } from './modules/role/role.component';
import {ScriptLoadService} from "../../shared/services/script-load.service";

const routes: Routes = [{ path: '', component: AuthenticationComponent }];


@NgModule({
  declarations: [AuthenticationComponent, RoleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    RegisterModule,
    LoginModule,
    MatButtonModule
  ],
  providers: [],
  exports: [AuthenticationComponent]
})
export class AuthenticationModule { }
