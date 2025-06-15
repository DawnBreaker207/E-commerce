import { CartItem } from '@/app/data/model/cart';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { displayedColumns, headerColumns } from '../../../../core/constants/columns';
import { CartService } from './service/cart.service';
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
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartPageComponent implements OnInit {
  displayedColumns = displayedColumns.cart;
  displayedHeader = headerColumns.cart;
  cartItems: CartItem[] = [];
  total = 0;
  quantity = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      if (cart) {
        this.cartItems = cart?.cart_items.filter((item) => item.cartItemId != null) ?? [];
      } else {
        this.cartItems = [];
      }
    });

    this.total = this.cartService.getCartTotal();
    this.quantity = this.cartService.getCartItemsCount();
  }

  getProduct(item: CartItem) {
    return this.cartService.getProductId(item.productId);
  }

  removeItemProduct(productId: number) {
    const item = this.cartItems.find((item) => item.productId === productId);
    if (item?.cartItemId) {
      return this.cartService.removeProductInCart(item.cartItemId).subscribe();
    }
    return;
  }
}
