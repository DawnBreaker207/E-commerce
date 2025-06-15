import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

import { environment } from '@/environments/environment.development';
import { Inventory } from '../../model/inventory';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  URL = `${environment.ApiUrl}/inventory`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Inventory>> {
    return this.http.get<Array<Inventory>>(`${this.URL}`).pipe(catchError(() => of()));
  }
  getOne(id: string): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.URL}/${id}`).pipe(catchError(() => of()));
  }
  create(input: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(`${this.URL}`, input).pipe(catchError(() => of()));
  }
  update(id: string, input: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.URL}/${id}`, input).pipe(catchError(() => of()));
  }
  delete(id: string): void {
    this.http.delete<void>(`${this.URL}/${id}`).pipe(catchError(() => of()));
  }
}
