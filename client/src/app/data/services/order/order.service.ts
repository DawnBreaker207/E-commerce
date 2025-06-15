import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../model/order';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '@/environments/environment.development';
import { PassedInitialConfig } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  BASE_URL = `${environment.ApiUrl}/orders`;
  constructor(private http: HttpClient) {}

  create(order: Order) {
    return this.http.post<Order>(`${this.BASE_URL}`, order).pipe(catchError(() => of()));
  }
  getAll() {
    return this.http.get<Array<Order>>(`${this.BASE_URL}`).pipe(catchError(() => of([])));
  }

  getOne(input: string) {
    return this.http.get<Order>(`${this.BASE_URL}/${input}`).pipe(catchError(() => of()));
  }

  update(input: Partial<Order>) {
    return this.http.put<Order>(`${this.BASE_URL}/${input.orderId}`, input).pipe(catchError(() => of()));
  }
  updateStatus(input: Partial<Order>) {
    return this.http.patch<Order>(`${this.BASE_URL}/${input.orderId}`, input).pipe(catchError(() => of()));
  }

  export(filter: any, format: 'excel' | 'csv') {
    let params = new HttpParams();
    Object.keys(filter).forEach((key) => {
      if (filter[key]) params = params.set(key, filter[key].toString());
    });
    params = params.set('format', format);
    return this.http.get(`${this.BASE_URL}/export`, { params, responseType: 'blob' }).pipe(catchError(() => of()));
  }
}
