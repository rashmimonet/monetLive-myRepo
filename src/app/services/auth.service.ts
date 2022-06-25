import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  loggedIn(): any {
    if (JSON.parse(localStorage.getItem('userDetails') || '').token) {
      // console.log('Token present');
    }
    else {
      console.log('token unavailable');
      this.router.navigate(['/auth']);
    }
    return !!JSON.parse(localStorage.getItem('userDetails') || '').token;
  }
}

@Injectable({
  providedIn: 'root'
})
export class IsLoggedIn {
  constructor(
    private router: Router, private snackBar: MatSnackBar, private au: AuthService) {
  }
  resolve(): any {
    if (localStorage.getItem('userDetails') && JSON.parse(localStorage.getItem('userDetails' || '{}') || '') && JSON.parse(localStorage.getItem('userDetails' || '{}') || '').token) {
      if (!((location.href.search('/report/') !== -1 || location.href.search('/teacher/') !== -1))) {
        this.router.navigate(['profile/dashboard/']);
      }
    }
    else {
      console.log('Token not found');
      this.snackBar.open('User Not Logged IN', '', {
        duration: 3000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
        panelClass: ['custom-snackbar']
      });
      this.router.navigate(['/auth']);
    }
    return !!JSON.parse(localStorage.getItem('userDetails') || '').token;
  }
}
