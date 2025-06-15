import { Cart } from '@/app/data/model/cart';
import { environment } from '@/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServerService {
  private URL = `${environment.ApiUrl}/carts`;
  constructor(private http: HttpClient) {}
  getCart(userId: string) {
    return this.http.get<Cart>(`${this.URL}/${userId}`).pipe(
      catchError((err) => {
        console.log('Error cart', userId);
        return throwError(() => err);
      }),
    );
  }

  createCart(cart: Cart) {
    return this.http.post<Cart>(this.URL, cart).pipe(
      catchError((err) => {
        console.log('Error cart', cart);
        return throwError(() => err);
      }),
    );
  }

  updateCart(cart: Cart) {
    return this.http.put<Cart>(`${this.URL}/${cart.cartId}`, cart).pipe(
      catchError((err) => {
        console.log('Error cart', cart);
        return throwError(() => err);
      }),
    );
  }
}
