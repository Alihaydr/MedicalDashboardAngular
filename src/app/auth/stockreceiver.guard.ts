import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class StockreceiverGuard implements CanActivate {

  constructor(private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let payload = null
    let token = localStorage.getItem("jwtToken")
    if (token != null) {
      payload = jwtDecode<JwtPayload>(token)
      // @ts-ignore
      if (payload.role == "superadmin" || payload.role == "admin" || payload.role == "stockreceiver") {
        return true;
      } else {
        // Redirect to the login page if the user is not authenticated
        this.router.navigate(['/']).then(() => window.scrollTo(0, 0));
        return false;
      }
    }

    return  false;
  }

}
