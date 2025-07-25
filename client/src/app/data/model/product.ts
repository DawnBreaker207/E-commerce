import { Category } from './category';

export interface Product {
  productId?: number;
  productTitle: string;
  sku: string;
  imageUrl: string;
  description: string;
  price: number;
  quantity: number;
  productDeleted: boolean;
  category?: Category;
}
