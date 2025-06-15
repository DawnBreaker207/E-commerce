import { CartItem } from '@/app/data/model/cart';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CartService } from '../../cart/service/cart.service';
@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart?.cart_items ?? [];
    });

    this.cartService.total$.subscribe((t) => (this.total = t));
  }

  getProduct(item: CartItem) {
    return this.cartService.getProductId(item.productId);
  }
}
