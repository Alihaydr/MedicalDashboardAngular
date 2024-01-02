import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  base_url :string = environment.apiLocalBaseUrl+"/api/user"

  constructor( private http:HttpClient) {}


// DONE get user by id
GetUserById(id:number):Observable<any>{

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
  });
  return this.http.get(this.base_url+`/${id}`, {headers}).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.error.data.error));
    })
  );
}


updateUserBy(user:any):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });
    return this.http.put(this.base_url+`/update`, user, { headers }).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.data.error));
      })
    );
  }

deleteUserById(id:number):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.delete(this.base_url+`/${id}`, { headers }).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.data.error));
      })
    );
  }

//DONE delete user by id
DeleteUserById(id:number):Observable<any>{

  return this.http.delete(this.base_url+`/${id}`).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.error.data.error));
    })
  );
}


// Add a new medicine
// addMedicine(medicineData: any): Observable<any> {
//   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

//   return this.http.post(this.base_url, JSON.stringify(medicineData), { headers }).pipe(
//     retry(2),
//     catchError((error: HttpErrorResponse) => {
//       return throwError(() => new Error(error.error.data.error));
//     })
//   );
// }

// Update an existing medicine
// updateMedicine(medID: number, updatedData: any): Observable<any> {

//   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//   const url = `${this.base_url}/${medID}`;

//   return this.http.put(url, JSON.stringify(updatedData), { headers }).pipe(
//     retry(2),
//     catchError((error: HttpErrorResponse) => {
//       return throwError(() => new Error(error.error.data.error));
//     })
//   );
// }




// if there is an error call this function





}
