import { PaymentMethod } from '@/app/core/constants/type';
import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'app-payment-select',
  standalone: true,
  imports: [ReactiveFormsModule, MatRadioModule, MatFormFieldModule, NgFor],
  templateUrl: './payment-select.component.html',
  styleUrl: './payment-select.component.css',
})
export class PaymentSelectComponent {
  @Input({ required: true }) form!: FormGroup;

  paymentOptions: PaymentMethod[] = ['COD', 'MOMO', 'VNPAY', 'ZALOPAY'];

  options = this.paymentOptions.map((p) => ({ name: p, value: p, url: 'https://picsum.photos/600/400?random' }));
}
