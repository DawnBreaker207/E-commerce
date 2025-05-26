import { Category } from '@/app/data/model/category';
import { CategoryService } from '@/app/data/services/category/category.service';
import { ProductService } from '@/app/data/services/product/product.service';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { SelectComponent } from '@/app/shared/components/select/select.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormField,
    MatDialogModule,
    InputComponent,
    MatIconModule,
    SelectComponent,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateProductComponent implements OnInit {
  form!: FormGroup;
  categories!: Category[];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CreateProductComponent>,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
  initializeForm() {
    this.form = this.fb.group({
      productTitle: [''],
      sku: [''],
      imageUrl: [''],
      description: [''],
      price: [],
      quantity: [],
      category: [null],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      const categoryId = this.form.value.categoryDto;
      const category = this.categories.find((c) => c.categoryId === categoryId);

      const payload = {
        ...this.form.value,
        categoryDto: category ? category : null,
      };

      this.productService.create(payload).subscribe(() => {});
      this.dialogRef.close();
    }
  }
}
