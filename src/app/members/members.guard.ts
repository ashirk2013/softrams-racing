import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class MembersGuard implements CanActivate {
  constructor(private router: Router, private appService: AppService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.appService.username == null) {
        alert("You must log in to continue");
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }
}
