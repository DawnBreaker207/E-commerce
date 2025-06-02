import { Cart, CartItem } from '@/app/data/model/cart';
import { Product } from '@/app/data/model/product';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = {
    cartId: 1,
    userId: '',
    cart_items: [],
  };
  private productsMap = new Map<number, Product>();
  total = 0;
  private cartSubject = new BehaviorSubject<Cart>(this.cart);
  cart$ = this.cartSubject.asObservable();

  setProducts(products: Product[]) {
    products.forEach((p) => this.productsMap.set(+p.productId!, p));
    this.recalculateTotal();
  }

  getProduct(productId: number) {
    return this.productsMap.get(productId);
  }

  getCartItems() {
    return this.cart.cart_items;
  }

  getCart() {
    console.log(this.cart);
    return this.cart;
  }

  addCartItems(product: Product) {
    const existingItem = this.cart.cart_items.find((item) => item.productId === +product.productId!);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem: CartItem = {
        cartItemId: Date.now(),
        cartId: this.cart.cartId,
        productId: +product.productId!,
        quantity: 1,
      };

      this.cart.cart_items.push(newItem);
    }
    this.recalculateTotal();
    this.cartSubject.next({ ...this.cart });
  }

  deleteCartItem(cartItemId: number) {
    this.cart.cart_items = this.cart.cart_items.filter((item) => item.cartItemId !== cartItemId);
    this.recalculateTotal();
    this.cartSubject.next({ ...this.cart });
  }

  recalculateTotal() {
    this.total = this.cart.cart_items.reduce((sum, item) => {
      const product = this.getProduct(item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  }
}
