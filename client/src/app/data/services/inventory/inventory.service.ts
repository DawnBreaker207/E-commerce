import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../../model/inventory';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  URL = `${environment.ApiUrl}/inventory`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Inventory>> {
    return this.http.get<Array<Inventory>>(`${this.URL}`);
  }
  getOne(id: string): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.URL}/${id}`);
  }
  create(input: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(`${this.URL}`, input);
  }
  update(id: string, input: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.URL}/${id}`, input);
  }
  delete(id: string): void {
    this.http.delete<void>(`${this.URL}/${id}`);
  }
}
