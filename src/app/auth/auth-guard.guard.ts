import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild,CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }


  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    let payload = null
    let token = localStorage.getItem("jwtToken")
    if (token != null) {
      payload = jwtDecode<JwtPayload>(token)
      // @ts-ignore
      if (payload.role == "superadmin") {
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
