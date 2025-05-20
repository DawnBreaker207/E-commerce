import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../model/order';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  BASE_URL: string;
  constructor(private httpClient: HttpClient) {
    this.BASE_URL = environment.ApiUrl;
  }

  orderProduct(order: Order): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };
    return this.httpClient.post<string>(`${this.BASE_URL}/order`, order, httpOptions);
  }
}
