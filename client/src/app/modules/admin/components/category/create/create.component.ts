import { CategoryService } from '@/app/data/services/category/category.service';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { categoryTitleValidation } from '@/app/shared/validations/category-title.validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormField,
    MatDialogModule,
    ButtonComponent,
    InputComponent,
    MatIconModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateCategoryComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CreateCategoryComponent>,
  ) {}

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      categoryTitle: [
        '',
        {
          validators: [Validators.required],
          //  asyncValidators : [categoryTitleValidation(this.categoryService)],
          //  updateOne: 'blur'
        },
      ],
    });
  }

  save() {
    if (this.form.valid) {
      this.categoryService.create(this.form.value).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
