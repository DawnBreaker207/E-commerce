import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Category } from '../../model/category';
import { ApiRes } from '../../model/common';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  URL = `${environment.ApiUrl}/category`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Category>> {
    return this.http.get<ApiRes<Array<Category>>>(`${this.URL}`).pipe(
      map((res) => res.data),
      catchError(() => of()),
    );
  }
  getOne(id: string): Observable<Category> {
    return this.http.get<ApiRes<Category>>(`${this.URL}/${id}`).pipe(
      map((res) => res.data),
      catchError(() => of()),
    );
  }
  create(input: Category): Observable<Category> {
    return this.http.post<ApiRes<Category>>(`${this.URL}`, input).pipe(
      map((res) => res.data),
      catchError(() => of()),
    );
  }
  update(id: string, input: Category): Observable<Category> {
    return this.http.put<ApiRes<Category>>(`${this.URL}/${id}`, input).pipe(
      map((res) => res.data),
      catchError(() => of()),
    );
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`).pipe(catchError(() => of()));
  }
}
