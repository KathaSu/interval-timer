import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiUrls, QueryUrls } from '@shared/services/base-api/base-api.enum';
import { QueryParams } from '@shared/services/base-api/base-api.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected base = '/api/';
  protected stub: string;
  protected static URLS = ApiUrls;
  protected static QUERY = QueryUrls;

  constructor(
    protected http: HttpClient,
  ) {}

  /**
   * HTTP GET request (with optional query parameters)
   */
  get(queryParams?: QueryParams): Observable<any> {
    const params = this.getQueryParameters(queryParams);

    return this.http.get(`${this.base}${this.stub}`, {params});
  }

  /**
   * HTTP PUT request with body (and optional query parameters) 
   */
  putBody(data?: any, queryParams?: QueryParams): Observable<any> {
    const params = this.getQueryParameters(queryParams);

    return this.http.put(`${this.base}${this.stub}`, data);
  }

  /**
   * HTTP PUT request with query parameters 
   */
  putQuery(queryParams: QueryParams): Observable<any> {
    const params = this.getQueryParameters(queryParams);

    return this.http.put(`${this.base}${this.stub}`, null, {params});
  }

  /**
   * HTTP POST request with body (and optional query parameters)
   */
  postBody(data: any, queryParams?: QueryParams): Observable<any> {
    const params = this.getQueryParameters(queryParams);

    return this.http.post(`${this.base}${this.stub}`, data, {params});
  }

  /**
   * HTTP POST request with query parameters
   */
  postQuery(queryParams: QueryParams) {
    const params = this.getQueryParameters(queryParams);

    return this.http.post(`${this.base}${this.stub}`, null, {params});
  }

  /**
   * HTTP DELETE request (with optional query parameters)
   * @param id of object that should be deleted
   */
  delete(queryParams?: QueryParams): Observable<any> {
    const params = this.getQueryParameters(queryParams);

    return this.http.delete(`${this.base}${this.stub}`, {params})
  }

  /**
   * Set HTTP parameters for POST oder PUT requests
   * @param queryParams Object with query parameters  
   * @returns HTTP parameters or null (when there are no params)
   */
  private getQueryParameters(queryParams: QueryParams): HttpParams {
    if (queryParams) {      
      let httpParams = new HttpParams();

      Object.keys(queryParams).forEach(k => {
        httpParams = httpParams.set(k, queryParams[k]);
      });

      return httpParams;
    }
    
    // Return null if there are no query params
    return null;
  }
}
