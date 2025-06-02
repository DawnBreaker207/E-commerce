import { Product } from './product';

export interface Category {
  categoryId?: string | number;
  categoryTitle: string;
  imageUrl?: string;
  categorySlug: string;
  categoryDeleted: boolean;
  products?: Product[];
}
