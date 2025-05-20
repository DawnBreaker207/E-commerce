import { Category } from '@/app/data/model/category';
import { CategoryService } from '@/app/data/services/category/category.service';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateCategoryComponent {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const category: Category = {
        name: this.categoryForm.get('name')?.value,
      };

      this.categoryService.create(category).subscribe((data) => {
        this.categoryForm.reset;
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
