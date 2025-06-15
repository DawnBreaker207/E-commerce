import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Category } from '../../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  URL = `${environment.ApiUrl}/category`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${this.URL}`).pipe(catchError(() => of()));
  }
  getOne(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.URL}/${id}`).pipe(catchError(() => of()));
  }
  create(input: Category): Observable<Category> {
    return this.http.post<Category>(`${this.URL}`, input).pipe(catchError(() => of()));
  }
  update(id: string, input: Category): Observable<Category> {
    return this.http.put<Category>(`${this.URL}/${id}`, input).pipe(catchError(() => of()));
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`).pipe(catchError(() => of()));
  }
}
