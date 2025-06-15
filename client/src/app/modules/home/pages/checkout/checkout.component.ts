import { OrderService } from '@/app/data/services/order/order.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { CartService } from '../../components/cart/service/cart.service';
import { PaymentSelectComponent } from '../../components/checkout/payment-select/payment-select.component';
import { SummaryComponent } from '../../components/checkout/summary/summary.component';
import { UserAddressComponent } from '../../components/checkout/user-address/user-address.component';
import { UserInfoComponent } from '../../components/checkout/user-info/user-info.component';
import { Order, OrderItem } from '@/app/data/model/order';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    UserInfoComponent,
    UserAddressComponent,
    SummaryComponent,
    PaymentSelectComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class CheckoutPageComponent implements OnInit {
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private readonly oidcSecurityService = inject(OidcSecurityService);
  ngOnInit(): void {
    this.initializeForm();
    this.oidcSecurityService.userData$.subscribe(({ userData }) => {
      console.log(userData);

      if (userData) {
        this.customerFormGroup.patchValue({
          customerId: userData?.sub || null,
          email: userData?.email,
          firstName: userData?.given_name,
          lastName: userData?.family_name,
          gender: userData?.gender,
          phone: userData?.phone,
          type: 'Register',
        });
      } else {
        const customerId = localStorage.getItem('guestId') || crypto.randomUUID();
        localStorage.setItem('guestId', customerId);

        this.customerFormGroup.patchValue({
          customerId: customerId,
          type: 'Guest',
        });
      }
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      customer: this.fb.group({
        customerId: ['', Validators.required],
        email: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['Male', Validators.required],
        phone: ['', Validators.required],
        type: ['Guest'],
      }),
      address: this.fb.group({
        full_address: ['', Validators.required],
        province_name: ['', Validators.required],
        district_name: ['', Validators.required],
        ward_name: ['', Validators.required],
        postal_code: ['', Validators.required],
      }),
      payment: this.fb.group({
        value: ['', Validators.required],
      }),
      orderNote: ['Testing'],
    });
  }

  onSubmit() {
    console.log(this.form.value);

    if (!this.form.valid) return;
    const currentCart = this.cartService.getCurrentCart();

    if (!currentCart?.cart_items.length) return;

    const orderItems: OrderItem[] = (currentCart?.cart_items || [])
      .filter((item) => {
        const product = this.cartService.getProductId(item.productId);
        return product !== undefined;
      })
      .map((item) => {
        const product = this.cartService.getProductId(item.productId)!;
        return {
          orderQuantity: item.quantity,
          orderPrice: product?.price || 0,
          orderDiscount: 0,
          product: product,
        };
      });

    const orderTotalPrice = orderItems?.reduce((total, item) => total + item.orderPrice * item.orderQuantity, 0);

    const orderData: Order = {
      customer: this.form.value.customer,
      orderTotalPrice: orderTotalPrice,
      orderFinalPrice: orderTotalPrice,
      orderNote: this.form.value.orderNote || '',
      orderStatus: 'Pending',
      orderPaymentMethod: this.form.value.payment.value,
      order_items: orderItems,
    };
    console.log(orderData);

    this.orderService
      .create(orderData)
      .pipe(
        switchMap(() => this.cartService.clearCart()),
        tap(() => {
          this.form.reset();
          localStorage.removeItem('guestId');
        }),
      )
      .subscribe();
  }

  get customerFormGroup(): FormGroup {
    return this.form.get('customer') as FormGroup;
  }

  get addressFormGroup(): FormGroup {
    return this.form.get('address') as FormGroup;
  }

  get paymentFormGroup(): FormGroup {
    return this.form.get('payment') as FormGroup;
  }
}
