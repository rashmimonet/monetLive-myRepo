import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  UrlSegment,
  Route,
  ActivatedRoute
} from '@angular/router';
import {AuthService} from './services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate, CanLoad {

  constructor(private au: AuthService, private router: Router, private route: ActivatedRoute){}

  canActivate(routeSnapshot: ActivatedRouteSnapshot): boolean {
    const customRedirect = routeSnapshot.data[`title`] === 'Monet Live | Authentication';
    if (customRedirect) {
      if (localStorage.getItem('userDetails') && JSON.parse(localStorage.getItem('userDetails' || '{}') || '') && JSON.parse(localStorage.getItem('userDetails' || '{}') || '').token) {
        this.router.navigate(['/profile/dashboard']);
        return true;
      }
      else {
        return true;
      }
    }
    else return !!(!customRedirect && this.au.loggedIn());
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (JSON.parse(localStorage.getItem('userDetails') || '').token) {
      this.router.navigate(['/profile/dashboard']);
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }

}
