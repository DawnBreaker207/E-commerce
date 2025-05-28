import { ProductService } from '@/app/data/services/product/product.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';

export function skuValidation(product: ProductService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return product.getAll().pipe(
      map((products) => {
        const product = products.find((product) => product.sku.toLowerCase() == control.value.toLowerCase());
        return product ? { titleExist: true } : null;
      }),
    );
  };
}
