import { Product } from './product';

export interface Category {
  categoryId?: string | number;
  categoryTitle: string;
  imageUrl?: string;
  products?: Product[];
}
