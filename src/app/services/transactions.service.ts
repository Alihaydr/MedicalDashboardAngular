import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { TransactionPull } from '../classes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  base_url :string = environment.apiLocalBaseUrl+'/api/v1/transactions';

  constructor( private http:HttpClient) {}

// transactionsArrayStatus: transactionClass[] = [];
 // Array to store the transactions

// getAllTransactions(pageNumber: number, type: string){
//   return this.http.get(this.base_url+`/${type}/all/${pageNumber}`).pipe(
//     retry(2),
//      catchError(this.handleError)
//   );
// }

// delete transaction by id
// DeleteTransactionById(TransactionID:number):Observable<any>{
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
//   });

//   return this.http.delete(this.base_url+`/${TransactionID}`, { headers }).pipe(
//     retry(2),
//     catchError((error: HttpErrorResponse) => {
//       return throwError(() => new Error(error.error.data.error));
//     })
//   );
// }

// DONE get transaction by id
// GetTransactionById(id:number):Observable<any>{
//   return this.http.get(this.base_url+`/${id}`).pipe(
//     retry(2),
//      catchError(this.handleError)

//   );
// }

// DONE get transaction by STATUS
GetTransactionPull(pageNumber:Number):Observable<any>{


  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
  });

  return this.http.get(this.base_url+`/pull/all/${pageNumber}`,{headers}).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log(error)
      return throwError(() => new Error(error.error.data.error));
    })
  )
}


GetTransactionPush(pageNumber:Number):Observable<any>{

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
  });

  return this.http.get(this.base_url+`/push/all/${pageNumber}`, {headers}).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      console.log(error)
      return throwError(() => new Error(error.error.data.error));
    })
  )
}


public pullTransaction(pull:TransactionPull, report:File | null):Observable<any>{

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
  });

  let transactionJson = JSON.stringify(pull)

  const formData: FormData = new FormData();
  formData.append('report', report!!, report?.name);
  formData.append('transaction', transactionJson);


  return this.http.post<any>(this.base_url+ `/pull/new`, formData,{ headers })
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        return throwError(() => new Error(error.error.data.error));
      })
    )
}

public getPushTransactionByID(id : number){

const headers = new HttpHeaders({
  'Authorization' : `Bearer ${localStorage.getItem('jwttoken')}`
})

return this.http.get(this.base_url+`/push/${id}`, {headers}).pipe(
  retry(2),
  catchError((error: HttpErrorResponse) => {
    return throwError(() => new Error(error.error.data.error));
  })
);
}

public getPullTransactionByID(id : number){

  const headers = new HttpHeaders({
    'Authorization' : `Bearer ${localStorage.getItem('jwttoken')}`
  })

  return this.http.get(this.base_url+`/pull/${id}`, {headers}).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.error.data.error));
    })
  );
  }


public getPullTransactionBySearchKey(searchKey: string): Observable<any> {

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}` });

  const params = new HttpParams().set('searchKey', searchKey);

  return this.http.get<any>(`${this.base_url}/pull/all`, { headers, params })
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.data.error));
      })
    );
}


public getPushTransactionBySearchKey(searchKey: string): Observable<any> {

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}` });

  const params = new HttpParams().set('searchKey', searchKey);

  return this.http.get<any>(`${this.base_url}/push/all`, { headers, params })
    .pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.data.error));
      })
    );
}

public updatePull(transactionPullObj : any ){
  const headers = new HttpHeaders({
    'Authorization' : `Bearer ${localStorage.getItem("jwtToken")}`
  })

  const url =`${this.base_url}/`

  return this.http.put(url, transactionPullObj, {headers}).pipe(
    retry(2),

    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.error.data.error));
    })
  );
}

public updatePush(transactionPushObj : any ){
  const headers = new HttpHeaders({
    'Authorization' : `Bearer ${localStorage.getItem("jwtToken")}`
  })

  const url =`${this.base_url}/`

  return this.http.put(url, transactionPushObj, {headers}).pipe(
    retry(2),

    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.error.data.error));
    })
  );
}



DeleteTransactionById(TransactionID:number, itemId:number, quantity:number):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
  });
    const params = new HttpParams()
        .set('itemId', itemId)
        .set('quantity',quantity);
    return this.http.delete(this.base_url+`/pull/${TransactionID}`, { headers,params }).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.error.data.error));
    })
  );
}





}
