import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

base_url :string = environment.apiLocalBaseUrl+"/api/v1/items";

constructor( private http:HttpClient) {}

public getMedicinesPerPage(pageNumebr:number):Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.get<any>(this.base_url+ `/all/${pageNumebr}`, { headers })
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return throwError(() => new Error(error.error.data.error));
        })
      )
  }

public getMedicineBySearchKey(searchKey: string): Observable<any> {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}` });

    const params = new HttpParams().set('searchKey', searchKey); 

    return this.http.get<any>(`${this.base_url}/all`, { headers, params })
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.data.error));
        })
      );
  }

public addMedicines(medicine:Item):Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.post<any>(this.base_url+ `/new`, medicine,{ headers })
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return throwError(() => new Error(error.error.data.error));
        })
      )
  }


public getCategories():Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.get<any>(this.base_url+ `/categories/all`, { headers })
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          return throwError(() => new Error(error.error.data.error));
        })
      )
  }

// DONE get Medicine by id
public GetMedById(medID:number):Observable<any>{

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
  });

  return this.http.get(this.base_url+`/${medID}`, {headers}).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.error.data.error));
    })
  );
}


// Update an existing medicine
public updateMedicine(updatedData: any): Observable<any> {

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
  });
  
  const url = `${this.base_url}/update`;

  return this.http.put(url, updatedData, { headers }).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.error.data.error));
    })
  );
}


//DONE delete Medicine by id
DeleteMedById(medID:number):Observable<any>{

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
  });

  return this.http.delete(this.base_url+`/delete/${medID}`, { headers }).pipe(
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




}
