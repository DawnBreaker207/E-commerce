import { Order } from '@/app/data/model/order';
import { Product } from '@/app/data/model/product';
import { OrderService } from '@/app/data/services/order/order.service';
import { ProductService } from '@/app/data/services/product/product.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, FormsModule, ProductCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  isAuthenticated = false;
  products: Array<Product> = [];
  quantityIsNull = false;
  orderSuccess = false;
  orderFailed = false;
  constructor(
    private readonly oidcSecurityService: OidcSecurityService,
    private readonly productService: ProductService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      this.productService
        .getAll()
        .pipe()
        .subscribe((product) => {
          this.products = product;
        });
    });
  }

  goToCreateProductPage() {
    this.router.navigateByUrl('/add-product');
  }

  // orderProduct(product: Product, quantity: string) {
  //   this.oidcSecurityService.userData$.subscribe((result) => {
  //     const userDetails = {
  //       email: result.userData.email,
  //       firstName: result.userData.given_name,
  //       lastName: result.userData.family_name,
  //     };

  //     if (!quantity) {
  //       this.orderFailed = true;
  //       this.orderSuccess = false;
  //       this.quantityIsNull = true;
  //     } else {
  //       const order: Order = {
  //         skuCode: product?.name as string,
  //         price: product.price,
  //         quantity: Number(quantity),
  //         userDetails: userDetails,
  //       };

  //       this.orderService.orderProduct(order).subscribe(
  //         () => {
  //           this.orderSuccess = true;
  //         },
  //         (error) => {
  //           this.orderFailed = false;
  //         },
  //       );
  //     }
  //   });
  // }
}
