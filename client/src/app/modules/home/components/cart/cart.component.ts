import { CartItem } from '@/app/data/model/cart';
import { Product } from '@/app/data/model/product';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CartService } from './cart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatInputModule,
    MatOptionModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.total;
  }

  getProduct(item: CartItem) {
    return this.cartService.getProduct(item.productId);
  }

  removeItem(cartItemId: number) {
    this.cartService.deleteCartItem(cartItemId);
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.total;
  }
}
