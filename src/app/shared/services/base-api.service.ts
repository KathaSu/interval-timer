import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  baseUrl = '/';

  constructor(
    public http: HttpClient,
  ) {}

  get(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  put(data: any): Observable<any> {
    return this.http.put<any>(this.baseUrl, data);
  }

  post(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  delete(): Observable<void> {
    return this.http.delete<void>(this.baseUrl);
  }
}
