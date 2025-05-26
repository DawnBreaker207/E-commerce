import { Category } from './category';

export interface Product {
  productId?: string;
  productTitle: string;
  sku: string;
  imageUrl: string;
  description: string;
  price: number;
  quantity: number;
  category?: Category;
}
