import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consumer } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  baseUrl:string = environment.apiLocalBaseUrl+'/api/v1/consumer';

  constructor(private http:HttpClient) { }



public deleteCon(id: number){

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
  });

  return this.http.delete(this.baseUrl+`/delete/${id}`, { headers }).pipe(
    retry(2),
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.error.data.error));
    })
  );
}

public getConsumerPerPage(pageNumebr:number):Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.get<any>(this.baseUrl+ `/all/${pageNumebr}`, { headers })
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.data.error));
        })
      );
  }


public getConsumerBySearchKey(searchKey: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    const params = new HttpParams().set('searchKey', searchKey);

    return this.http.get<any>(`${this.baseUrl}/all`, { headers, params })
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.data.error));
        })
      );
  }


  public getConsumerById(consumerId: number): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.get<any>(`${this.baseUrl}/noitem/${consumerId}`,{headers})
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error(error.error.data.error));
        })
      );
  }

  public updateConsumer(consumer: Consumer, document: File | null): Observable<any> {
    let consumerJson = JSON.stringify(consumer)

    const formData: FormData = new FormData();
    if(document != null){
      formData.append('document', document, document?.name);
    }
    formData.append('consumer', consumerJson);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.put<any>(`${this.baseUrl}/update`, formData, { headers })
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.data.error));
        })
      );
  }



    public addConsumer(consumer:Consumer, document:File | null): Observable<any> {
    let consumerJson = JSON.stringify(consumer)

    const formData: FormData = new FormData();
    formData.append('document', document!!, document?.name);
    formData.append('consumer', consumerJson);


    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.post<any>(`${this.baseUrl}/new`,formData,{ headers })
            .pipe(
              retry(1),
              catchError((error: HttpErrorResponse) => {
                console.log(error)
                return throwError(() => new Error(error.error.data.error));
              })
            )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred:';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else if (error.error && typeof error.error === 'object') {
      // Server-side error - try to extract the error message
      if (error.error.message) {
        errorMessage = `Status: ${error.status}, Message: ${error.error.message}`;
      } else if (error.error.error) {
        errorMessage = `Status: ${error.status}, Message: ${error.error.error}`;
      } else if (error.error.statusText) {
        errorMessage = `Status: ${error.status}, Message: ${error.error.statusText}`;
      }
    } else {
      // Fallback for other cases
      errorMessage = `Status: ${error.status}, Message: ${error.statusText}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
