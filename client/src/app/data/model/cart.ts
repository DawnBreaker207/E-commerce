export interface Cart {
  cartId?: number;
  userId: string;
  cart_items: CartItem[];
}

export interface CartItem {
  cartItemId: number | undefined;
  cartId?: number;
  productId: number;
  quantity: number;
}
