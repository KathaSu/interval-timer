import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected base = '/api/';
  protected stub: string;

  // protected config = {
  //   get: {
  //     params:
  //   }
  // }


  constructor(
    protected http: HttpClient,
  ) {}

  get() {
    // new HttpParams(this.config.get.params)
    return this.http.get(`${this.base}${this.stub}`);
  }


  put(data: any) {
    return this.http.put(`${this.base}${this.stub}`, data);
  }

  post(data: any) {
    return this.http.post(`${this.base}${this.stub}`, data);
  }

  delete(id: number): any {
    return this.http.delete(`${this.base}${this.stub}${id}`)
  }
}
