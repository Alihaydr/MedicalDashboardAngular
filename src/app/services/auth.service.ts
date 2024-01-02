import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject, Observable, catchError, retry, throwError} from "rxjs";
import { SignUp, logInInfo } from '../classes';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url :string = `${environment.apiLocalBaseUrl}/api/user`

constructor(private cookieService: CookieService, private http:HttpClient, private router:Router) {}

private isAuthenticatedKey = 'isAuthenticated';

//DONE Sign Up
signUp(userinfo:SignUp):Observable<any>{

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
  });

  return this.http.post(this.base_url+'/signup', userinfo, { headers }).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error('Something bad happened; please try again later.'));
    })
  );

}

getUsers():Observable<any>{
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${localStorage.getItem("jwtToken")}` });

    return this.http.get(this.base_url+'/all',{ headers }).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );

  }


//DONE log in
LogIn(userinfo:any):Observable<any>{
  return this.http.post(this.base_url+'/signin', userinfo).pipe(
    retry(2)
  );
}

//DONE get user by id
GetUserById(userID:number):Observable<any>{
  return this.http.get(this.base_url+`/${userID}`).pipe(
    retry(2),
  );
}

logout(): void {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('expireAt');
  window.location.reload();
}

isLoggedIn(): boolean {
    // return true
    return this.cookieService.get(this.isAuthenticatedKey) === 'true';
  }


}
