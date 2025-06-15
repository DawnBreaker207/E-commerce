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
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    InputComponent,
    MatIconModule,
    SelectComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  categories!: Category[];
  id: string | null = null;
  isEdit = false;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string | null } = { id: null },
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });

    this.id = this.data.id;
    this.isEdit = !!this.id;

    if (this.isEdit && this.id) {
      this.productService.getOne(this.id).subscribe((data) => {
        this.form.patchValue({
          ...data,
          category: data.category ? data.category.categoryId : null,
        });
      });
    }
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

  save() {
    if (this.form.invalid) return;

    {
      const categoryId = this.form.value.category;
      const category = this.categories.find((c) => c.categoryId === categoryId);

      const payload = {
        ...this.form.value,
        category: category ? category : null,
      };

      const save$ =
        this.id && this.isEdit ? this.productService.update(this.id, payload) : this.productService.create(payload);

      save$.subscribe({});
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
