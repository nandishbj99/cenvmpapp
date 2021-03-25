import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: string = 'http://52.66.211.181:4100';

  headers = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient,public router: Router) { }

  register(user: any): Observable<any> {

    return this.httpClient.post(`${this.API_URL}/users/register`, {user});
  }

  panupload(pand:any):Observable<any> {


    return this.httpClient.post(`${this.API_URL}/pan`,pand,{headers: this.headers});
  }


  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
