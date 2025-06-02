import { Product } from './product';
import { User } from './user';

export interface Order {
  orderId?: number;
  user: User;
  cartId: string;
  orderTotalPrice: number;
  orderFinalPrice: number;
  orderNote: string;
  orderStatus: string;
  orderPaymentMethod: string;
  order_items: OrderItem[];
}

export interface OrderItem {
  orderItemId: number;
  orderQuantity: number;
  orderPrice: number;
  orderDiscount: number;
  product: Product;
}
