import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../../model/product';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  URL = `${environment.ApiUrl}/product`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${this.URL}`).pipe(catchError(() => of()));
  }
  getOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/${id}`).pipe(catchError(() => of()));
  }
  create(input: Product): Observable<Product> {
    return this.http.post<Product>(`${this.URL}`, input).pipe(catchError(() => of()));
  }
  update(id: string, input: Product): Observable<Product> {
    return this.http.put<Product>(`${this.URL}/${id}`, input).pipe(catchError(() => of()));
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`).pipe(catchError(() => of()));
  }
}
