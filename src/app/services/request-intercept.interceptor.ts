import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ApiService} from '../modules/shared/services/api.service';
import {Router} from '@angular/router';
import {UtilityService} from "../modules/shared/services/utility.service";

@Injectable()
export class RequestInterceptInterceptor implements HttpInterceptor {

  constructor(private as: ApiService, private router: Router, private utility: UtilityService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let changedReq;
    if (
      request.url.match('login') ||
      request.url.match('googleapis') ||
      request.url.match('register') ||
      request.url.match('forgotPassword') ||
      request.url.match('emailVerification') ||
      request.url.match('emailResend') ||
      request.url.match('resetPassword')
    ) {
      changedReq = request;
    }
    else {
      const headers = this.as.getHeaders();
      changedReq = request.clone(headers);
    }

    return next.handle(changedReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if (this.as.canCheckAuth(event) && event.body) {
              if (
                (
                  typeof event.body.error !== 'undefined' && event.body.error === true &&
                  ( event.body.message === 'token_expired'
                    || event.body.message === 'token_not_provided'
                    || event.body.message === 'token_invalid'
                    || event.body.message === 'Invalid Token!'
                    || event.body.message === 'Token not Provided'
                    || event.body.message === 'Unauthorised!'
                  )
                )
              ) {
                // console.log('forcelogout due to inactivity');
                this.as.forceLogout(event.body.message);
              }
            }
          }
          return event;
        },
        err => {
          if (err.status === 401 || err.code === 401) {
            this.utility.notify('Unauthorized. Please login and try again', '');
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['auth/login']);
          }
          if (err.status === 500) {
            this.utility.notify('Unauthorized. Please login and try again', '');
          }
          if (err.status === 404 || err.status === 422) {
            this.utility.notify('Unauthorized. Please login and try again', '');
          }
          if (err.status === 400) {
            this.utility.notify('Unauthorized. Please login and try again', '');
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['auth/']);
          }
        }
      ));
  }
}
