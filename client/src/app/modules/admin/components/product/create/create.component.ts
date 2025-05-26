import { ProductService } from '@/app/data/services/product/product.service';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatInputModule, MatFormField, MatDialogModule,InputComponent, MatIconModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateProductComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<CreateProductComponent>,
  ) {
    this.form = this.fb.group({
      productTitle: [''],
      sku: [''],
      imageUrl: [''],
      description: [''],
      price: [],
      quantity: [],
      categoryDto: ['']
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      this.productService.create(this.form.value).subscribe(() => {});
      this.dialogRef.close();
    }
  }
}
