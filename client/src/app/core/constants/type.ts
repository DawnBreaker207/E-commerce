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

export enum PaymentStatusType {
  Pending = 'Pending',
  Paid = 'Paid',
  Failed = 'Failed',
  Refunded = 'Refunded',
}

export enum SortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  FINAL_PRICE = 'finalPrice',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export const sortByOptions = [
  { label: 'Newest', value: { sortBy: SortBy.CREATED_AT, sortDirection: SortDirection.DESC } },
  { label: 'Oldest', value: { sortBy: SortBy.CREATED_AT, sortDirection: SortDirection.ASC } },
  { label: 'Highest Price', value: { sortBy: SortBy.FINAL_PRICE, sortDirection: SortDirection.DESC } },
  { label: 'Lowest Price', value: { sortBy: SortBy.FINAL_PRICE, sortDirection: SortDirection.ASC } },
];
