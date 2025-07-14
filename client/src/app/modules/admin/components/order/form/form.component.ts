import { OrderStatusType } from '@/app/core/constants/type';
import { OrderService } from '@/app/data/services/order/order.service';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { SelectComponent } from '@/app/shared/components/select/select.component';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    InputComponent,
    MatIconModule,
    SelectComponent,
    CommonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class OrderFormComponent implements OnInit {
  form!: FormGroup;
  id: string | null = null;
  isEdit = false;
  orderStatus = Object.entries(OrderStatusType).map(([value, label]) => ({ value: value, label }));
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string | null; isEdit?: boolean } = { id: null, isEdit: false },
  ) {}
  ngOnInit(): void {
    this.id = this.data.id;
    this.isEdit = !!this.data.isEdit || false;

    this.initializeForm();

    if (this.id) {
      this.orderService.getOne(this.id).subscribe((data) => {
        if (this.isEdit) this.form.get('orderStatus')?.enable();

        const status = data.orderStatus?.toUpperCase();
        const isValidStatus = this.orderStatus.some((opt) => opt.value === status);

        this.form.patchValue({ ...data, orderStatus: isValidStatus ? status : null });

        const items = this.fb.array(data.order_items?.map((item) => this.createOrderItems(item)) ?? []);
        this.form.setControl('order_items', items);
      });
    }
  }

  initializeForm() {
    this.form = this.fb.group({
      orderId: [{ value: null, disable: true }],
      orderFinalPrice: [{ value: null, disable: true }],
      orderNote: [{ value: null, disable: true }],
      orderPaymentMethod: [{ value: null, disable: true }],
      orderStatus: [null],
      order_items: this.fb.array([]),
      customer: this.fb.group({
        email: [{ value: null, disable: true }],
        phone: [{ value: null, disable: true }],
      }),
    });

    if (!this.isEdit) {
      this.form.get('orderStatus')?.disable();
    }
  }

  createOrderItems(item: any) {
    return this.fb.group({
      orderItemId: [{ value: item.orderItemId, disabled: true }],
      orderQuantity: [{ value: item.orderQuantity, disabled: true }],
      orderPrice: [{ value: item.orderPrice, disabled: true }],
      product: this.fb.group({
        productTitle: [{ value: item.product?.productTitle, disabled: true }],
        imageUrl: [{ value: item.product?.imageUrl, disabled: true }],
      }),
    });
  }

  save() {
    if (this.form.invalid || !this.isEdit) return;
    const orderStatus = this.form.get('orderStatus')?.value;
    const payload = {
      orderId: this.form.get('orderId')?.value,
      orderStatus: orderStatus,
    };
    if (this.id && this.isEdit) {
      this.orderService.updateStatus(payload).subscribe(() => {
        this.close();
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  get orderItemArray() {
    return this.form.get('order_items') as FormArray;
  }
}
