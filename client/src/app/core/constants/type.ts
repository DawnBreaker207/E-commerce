export type Gender = 'Male' | 'Female' | 'Other';

export type CustomerType = 'Register' | 'Guest';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipping' | 'Delivered' | 'Cancelled' | 'Returned';

export type PaymentMethod = 'COD' | 'VNPAY' | 'MOMO' | 'ZALOPAY';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export const OrderStatusType = {
  Pending: 'Pending',
  Confirmed: 'Confirmed',
  Shipping: 'Shipping',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
  Returned: 'Returned',
} as const;
