import { OrderStatus, PaymentMethod, PaymentStatus } from '@/app/core/constants/type';
import { Customer } from './customer';
import { Product } from './product';

export interface Order {
  orderId?: number;
  customer: Customer;
  orderTotalPrice?: number;
  orderFinalPrice?: number;
  orderNote: string;
  orderStatus: OrderStatus;
  orderPaymentMethod: PaymentMethod;
  order_items?: OrderItem[];
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  orderItemId?: number;
  orderQuantity: number;
  orderPrice: number;
  orderDiscount: number;
  product: Product;
}

export interface FilterSort {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  page?: number;
  query?: string;
}
export interface FilterDate {
  dateFrom?: string;
  dateTo?: string;
}

export interface OrderFilter extends FilterSort, FilterDate {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
}

