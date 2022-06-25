import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviourSubjectsService } from '../../../services/behaviour-subjects.service';
import {UtilityService} from "./utility.service";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  dynamicLink: any = '';
  base = environment.base;
  studentData: any;
  public CamOffUsersArr: any = [];
  public headers: any;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private date: DatePipe,
    private router: Router,
    private bhvSub: BehaviourSubjectsService,
    private utility: UtilityService
  ) {
    this.setDynamicLink();
  }

  setDynamicLink(): void {
    this.bhvSub.dynamicLink$.subscribe((next: any) => this.dynamicLink = next);
  }

  public getHeaders(): any {
    const token = JSON.parse(localStorage.getItem('userDetails') || '').token;
    if (token) {
      return { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) };
    } else {
      // console.log('User Logged Out as token unavailable');
      this.forceLogout('token_not_provided');
    }
  }

  getApiStatic(endpoint: string): Observable<any> {
    return this.http
      .get<any>(
        // `https://www.monetlive.com/${this.dynamicLink}/many/api/${endpoint}`
        `https://www.monetlive.com/many/api/${endpoint}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            // console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          this.utility.notify(errorMsg, 'Okay');
          return throwError(errorMsg);
        })
      );
  }

  postApiStatic(endPoint: string, data: any): Observable<any> {
    return this.http.post(
      // `https://www.monetlive.com/many/api/${endPoint}`,
      // `http://localhost:8092/many/api/${endPoint}`,
      `https://www.monetlive.com/many/api/${endPoint}`,
      data
    )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            // console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          this.utility.notify(errorMsg, 'Okay');
          return throwError(errorMsg);
        })
      );
  }

  putApiStatic(endpoint: string, data: any): Observable<any> {
    return this.http
      .put(
        // `https://www.monetlive.com/${this.dynamicLink}/many/api/${endpoint}`,
        `https://www.monetlive.com/many/api/${endpoint}`,
        data
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            //console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            //console.log('this is server side error');
            //console.log('error -> ', error);
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          this.utility.notify(errorMsg, 'Okay');
          return throwError(errorMsg);
        })
      );
  }


  getApi(endpoint: string): Observable<any> {
    return this.http
      .get<any>(
        // `https://www.monetlive.com/${this.dynamicLink}/many/api/${endpoint}`
        `https://www.monetlive.com/${this.dynamicLink}/many/api/${endpoint}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            // console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          this.utility.notify(errorMsg, 'Okay');
          return throwError(errorMsg);
        })
      );
  }

  // this is created because some api need to hit without dynamic link or master server
  getApi1(endpoint: string): Observable<any> {
    return this.http
      .get<any>(
        // `https://www.monetlive.com/${this.dynamicLink}/many/api/${endpoint}`
        `https://www.monetlive.com/many/api/${endpoint}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            // console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          this.utility.notify(errorMsg, 'Okay');
          return throwError(errorMsg);
        })
      );
  }

  postApi(endpoint: string, data: any): Observable<any> {
    return (
      this.http
        .post(
          // `https://www.monetlive.com/${this.dynamicLink}/many/api/${endpoint}`,
          `https://www.monetlive.com/${this.dynamicLink}/many/api/${endpoint}`,
          data
        )

        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.error instanceof ErrorEvent) {
              // console.log('this is client side error');
              errorMsg = `Error: ${error.error.message}`;
            } else {
              // console.log('this is server side error');
              // console.log('error -> ', error);
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            }
            this.utility.notify(errorMsg, 'Okay');
            return throwError(errorMsg);
          })
        )
    );
  }


  // This method is created because some api need to hit without dynamic link or master server
  postApi1(endpoint: string, data: any): Observable<any> {
    return (
      this.http
        .post(
          // `https://www.monetlive.com/${this.dynamicLink}/many/api/${endpoint}`,
          `https://www.monetlive.com/many/api/${endpoint}`,
          data
        )

        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMsg = '';
            if (error.error instanceof ErrorEvent) {
              // console.log('this is client side error');
              errorMsg = `Error: ${error.error.message}`;
            } else {
              // console.log('this is server side error');
              // console.log('error -> ', error);
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            }
            this.utility.notify(errorMsg, 'Okay');
            return throwError(errorMsg);
          })
        )
    );
  }

  putApi(endpoint: string, data: any): Observable<any> {
    return this.http
      .put(
        // `https://www.monetlive.com/${this.dynamicLink}/many/api/${endpoint}`,
        `https://www.monetlive.com/${this.dynamicLink}/many/api/${endpoint}`,
        data
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            // console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // console.log('this is server side error');
            // console.log('error -> ', error);
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          this.utility.notify(errorMsg, 'Okay');
          return throwError(errorMsg);
        })
      );
  }

  deleteApi(endpoint: any, id?: any): Observable<any> {
    return this.http
      .delete(`${this.base + endpoint}/${id}`)

      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            // console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            // console.log('this is server side error');
            // console.log('error -> ', error);
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          this.utility.notify(errorMsg, 'Okay');
          return throwError(errorMsg);
        })
      );
  }

  forceLogout(reason: any): any {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['auth']);
    this.utility.notify(reason, '');
  }

  canCheckAuth(event: any): boolean {
    if (!event.url.match(/isValidToken/g)) {
      const lastAuthAt = localStorage.getItem('lastAuthAt');
      if (
        !lastAuthAt ||
        +lastAuthAt < Math.floor(new Date().getTime() / 1000) - 2
      ) {
        localStorage.setItem(
          'lastAuthAt',
          Math.floor(new Date().getTime() / 1000).toString()
        );
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  getLocalStorage(key: string): any {
    const plan = localStorage.getItem(key);
    if (plan) {
      return JSON.parse(String(plan));
    } else {
      return plan;
    }
  }

  storeLocalStorage(key: string, data: any): any {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
