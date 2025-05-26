import { CategoryService } from '@/app/data/services/category/category.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';

export function categoryTitleValidation(category: CategoryService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return category.getAll().pipe(
      map((categories) => {
        const category = categories.find(
          (category) => category.categoryTitle.toLowerCase() == control.value.toLowerCase(),
        );

        return category ? { titleExists: true } : null;
      }),
    );
  };
}
