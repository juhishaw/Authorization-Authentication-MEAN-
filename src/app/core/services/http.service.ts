import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { StatusCodeConstant } from '../constants/status-code.constant';
import { RouteConstants } from '../constants/route.constants';


@Injectable()
export class CustomHttpService {
  constructor(private http: HttpClient, private router: Router) {}

  get<T>(
    url: any,
    options?: HttpParams,
    skipAuthorization?: boolean,
    thirdPartyUrl?: string
  ): Observable<T> {
    this.beforeRequest();
    let paramsData: HttpParams;
    let requestHeader: any;
    paramsData = options ? this.createParamData(options) : null;

    return this.http
      .get<T>(thirdPartyUrl ? thirdPartyUrl :  url, {
        headers: requestHeader,
        params: paramsData,
      })
      .pipe(
        tap((response) => response),
        catchError((error) => this.errorHandler(error))
      );
  }

  post<T>(
    url: any,
    data?: any,
    isMultipart?: boolean,
    options?: any,
    skipAuthorization?: boolean,
    thirdPartyUrl?: string
  ): Observable<T> {
    this.beforeRequest();
    let requestHeader: any;
    return this.http
      .post<T>(thirdPartyUrl ? thirdPartyUrl : url, data, {
        headers: requestHeader,
      })
      .pipe(
        tap((response) => response),
        catchError((error) => this.errorHandler(error))
      );
  }

  put<T>(
    url: any,
    data: any,
    thirdPartyUrl?: string,
    isMultipart?: boolean
  ): Observable<T> {
    this.beforeRequest();
    let requestHeader: any;

    return this.http
      .put<T>(thirdPartyUrl ? thirdPartyUrl :  url, data, {
        headers: requestHeader,
      })
      .pipe(
        tap((response) => response),
        catchError((error) => this.errorHandler(error))
      );
  }

  patch<T>(
    url: any,
    data: any,
    isMultipart?: boolean,
    thirdPartyUrl?: string
  ): Observable<T> {
    this.beforeRequest();
    let requestHeader: any;
    
    return this.http
      .patch<T>(
        thirdPartyUrl ? thirdPartyUrl :  url,
        data,
        {
          headers: requestHeader,
        }
      )
      .pipe(
        tap((response) => response),
        catchError((error) => this.errorHandler(error))
      );
  }

  delete<T>(url: any, options?: any): Observable<T> {
    this.beforeRequest();
    let requestHeader: any;
    // requestHeader = this.createRequestHeaders(false);
    // console.log(requestHeader, 'header');
    return this.http
      .delete<T>( url, {
        headers: requestHeader,
      })
      .pipe(
        tap((response) => response),
        catchError((error) => this.errorHandler(error))
      );
  }

  errorHandler(error: { error: any; status: any }) {
    const errorObj = error.error;

    /*Make single template for all the error*/
    switch (error.status) {
      case StatusCodeConstant.NOT_FOUND:
        this.router.navigate([`error/${StatusCodeConstant.NOT_FOUND}`], {
          skipLocationChange: true,
          replaceUrl: true,
        });
        break;
      case StatusCodeConstant.FORBIDDEN:
        this.router.navigate([`error/${StatusCodeConstant.FORBIDDEN}`], {
          skipLocationChange: true,
          replaceUrl: true,
        });
        break;
      case StatusCodeConstant.UNAUTHORIZED_ACCESS:
        this.unAuthorizedErrorHandler();
        break;
      case StatusCodeConstant.INTERNAL_ERROR:
        this.router.navigate([`error/${StatusCodeConstant.INTERNAL_ERROR}`], {
          skipLocationChange: true,
          replaceUrl: true,
        });
        break;
      case StatusCodeConstant.ERROR_IN_DATA:
        this.router.navigate([`error/${StatusCodeConstant.ERROR_IN_DATA}`], {
          skipLocationChange: true,
          replaceUrl: true,
        });
        break;
    }
    return throwError(errorObj);
  }

  beforeRequest() {
    if (!navigator.onLine) {
      alert('No internet connection');
    }
  }

  createParamData(data: HttpParams) {
    let params = new HttpParams();
    Object.keys(data).forEach((key) => {
      if (typeof data[key] !== undefined && data[key]) {
        params = params.append(key, data[key]);
      }
    });
    return params;
  }

  unAuthorizedErrorHandler() {
    localStorage.clear();
    this.router.navigate([RouteConstants.LOGIN], {
      queryParams: {
        unauthorized: '1',
        message: 'Please login to access the information.',
      },
    });
  }
}
