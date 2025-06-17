export const headerColumns = {
  product: ['#', 'Title', 'SKU', 'Image', 'Description', 'Price', 'Quantity', 'Action'],
  category: ['#', 'Title', 'Image', 'Action'],
  cart: ['#', 'Image', 'Title', 'Price', 'Total', 'Action'],
  order: ['', 'Customer', 'Note', 'Total', 'Status', 'Created', 'Action'],
};

export const displayedColumns = {
  product: ['productId', 'productTitle', 'sku', 'imageUrl', 'description', 'price', 'quantity', 'action'],
  category: ['categoryId', 'categoryTitle', 'imageUrl', 'action'],
  cart: ['index', 'imageUrl', 'productTitle', 'price', 'total', 'action'],
  order: ['orderId', 'customer', 'orderNote', 'orderFinalPrice', 'orderStatus', 'created_at', 'action'],
};
