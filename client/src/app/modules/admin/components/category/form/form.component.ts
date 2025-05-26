import { CategoryService } from '@/app/data/services/category/category.service';
import { ButtonComponent } from '@/app/shared/components/button/button.component';
import { InputComponent } from '@/app/shared/components/input/input.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-category',
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
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  id: string | null = null;
  isEdit = false;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string | null } = { id: null },
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    this.id = this.data.id;
    this.isEdit = !!this.id;

    if (this.isEdit && this.id) {
      this.categoryService.getOne(this.id).subscribe((data) => {
        this.form.patchValue(data);
      });
    }
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
    if (this.form.invalid) return;

    const save$ =
      this.id && this.isEdit
        ? this.categoryService.update(this.id, this.form.value)
        : this.categoryService.create(this.form.value);

    save$.subscribe(() => {
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
