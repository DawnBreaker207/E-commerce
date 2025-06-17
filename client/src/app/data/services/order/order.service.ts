import { environment } from '@/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiRes, ApiRestPagination } from '../../model/common';
import { Order, OrderFilter } from '../../model/order';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  BASE_URL = `${environment.ApiUrl}/orders`;
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  create(order: Order) {
    return this.http.post<Order>(`${this.BASE_URL}`, order).pipe(catchError(() => of()));
  }
  getAll(filter?: OrderFilter, page: number = 0, size: number = 0) {
    let params = new HttpParams();

    params = params.set('page', page.toString());
    params = params.set('size', size.toString());

    const startDate = this.formatDate(filter?.dateFrom);
    const endDate = this.formatDate(filter?.dateTo);
    filter = { ...filter, dateFrom: startDate, dateTo: endDate };

    if (filter) {
      Object.keys(filter).forEach((key) => {
        const value = filter[key as keyof OrderFilter];
        if (value !== null && value !== undefined && value !== '') {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.http.get<ApiRestPagination<Array<Order>>>(`${this.BASE_URL}`, { params }).pipe(
      map((res) => res.data),
      catchError(() => of([])),
    );
  }

  getOne(input: string) {
    return this.http.get<ApiRes<Order>>(`${this.BASE_URL}/${input}`).pipe(
      map((res) => res.data),
      catchError(() => of()),
    );
  }

  update(input: Partial<Order>) {
    return this.http.put<ApiRes<Order>>(`${this.BASE_URL}/${input.orderId}`, input).pipe(
      map((res) => res.data),
      catchError(() => of()),
    );
  }
  updateStatus(input: Partial<Order>) {
    return this.http.patch<ApiRes<Order>>(`${this.BASE_URL}/${input.orderId}`, input).pipe(
      map((res) => res.data),
      catchError(() => of()),
    );
  }

  export(filter: any, format: 'excel' | 'csv') {
    let params = new HttpParams();
    Object.keys(filter).forEach((key) => {
      if (filter[key]) params = params.set(key, filter[key].toString());
    });
    params = params.set('format', format);
    return this.http
      .get(`${this.BASE_URL}/export`, { params, responseType: 'blob' })
      .pipe(catchError(this.handleError<Order>('getAll')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }

  private formatDate(date?: Date | string): string | undefined {
    if (!date) return undefined;
    return this.datePipe.transform(new Date(date), 'dd-MM-yyyy') ?? undefined;
  }
}
