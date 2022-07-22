import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {InternetSpeedService} from './services/internet-speed.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptInterceptor} from './services/request-intercept.interceptor';
import {BehaviourSubjectsService} from './services/behaviour-subjects.service';
import {GuardGuard} from './guard.guard';
import {IsLoggedIn} from './services/auth.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MSAL_INSTANCE, MsalModule, MsalService} from '@azure/msal-angular';
import {IPublicClientApplication, PublicClientApplication} from '@azure/msal-browser';
import {DatePipe} from '@angular/common';
import {PolicyComponent} from './components/policy/policy.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MonitorComponent} from './components/monitor/monitor.component';
import {MonetHomePageComponent} from './components/MonetHomePage/MonetHomePage.component';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {SharedModule} from './modules/shared/shared.module';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatIntlTelInputModule } from 'ngx-11-mat-intl-tel-input';
import { WebsocketService } from './services/websocket.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';


export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'd5663bf8-e35c-4004-a386-52a27ff98eb4', // client ID
      // redirectUri: 'http://localhost:4200'// redirect URI
      redirectUri: 'https://www.monetlive.com/'// redirect URI
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    PolicyComponent,
    MonitorComponent,
    MonetHomePageComponent,
    DialogBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MsalModule,
    FlexLayoutModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    MatPaginatorModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule
  ],
  providers: [
    InternetSpeedService,
    GuardGuard,
    IsLoggedIn,
    BehaviourSubjectsService,
    WebsocketService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
