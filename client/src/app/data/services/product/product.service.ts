import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiRes } from '../../model/common';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  URL = `${environment.ApiUrl}/product`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Product>> {
    return this.http.get<ApiRes<Array<Product>>>(`${this.URL}`).pipe(
      map((data) => data.data),
      catchError(() => of()),
    );
  }
  getOne(id: string): Observable<Product> {
    return this.http.get<ApiRes<Product>>(`${this.URL}/${id}`).pipe(
      map((res) => res.data),
      catchError(() => of()),
    );
  }
  create(input: Product): Observable<Product> {
    return this.http.post<ApiRes<Product>>(`${this.URL}`, input).pipe(
      map((res) => res.data),
      catchError(() => of()),
    );
  }
  update(id: string, input: Product): Observable<Product> {
    return this.http.put<ApiRes<Product>>(`${this.URL}/${id}`, input).pipe(
      map((res) => res.data),
      catchError(() => of()),
    );
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`).pipe(catchError(() => of()));
  }
}
