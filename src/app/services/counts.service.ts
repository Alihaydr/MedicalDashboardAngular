import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountsService {


  baseUrl:string = environment.apiLocalBaseUrl;

  constructor(private http:HttpClient) { }

  public getTransactionCountingPull():Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.get<any>(this.baseUrl+ '/api/v1/transactions/pull/count', { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  

  public getTransactionCountingPush():Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.get<any>(this.baseUrl+ '/api/v1/transactions/push/count', { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  public getConsumerCounting():Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.get<any>(this.baseUrl+ '/api/v1/consumer/count', { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  public getItemCounting():Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
    });

    return this.http.get<any>(this.baseUrl+ '/api/v1/items/count', { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
