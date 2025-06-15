package com.dawn.server.helper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.dawn.server.dto.CartDto;
import com.dawn.server.dto.CartItemDto;
import com.dawn.server.model.Cart;
import com.dawn.server.model.CartItem;
import com.dawn.server.model.Product;
import com.dawn.server.model.User;

public interface CartMappingHelper {
    static CartDto map(final Cart cart) {
	if (cart == null)
	    return null;
	return CartDto.builder().cartId(cart.getCartId()).userId(cart.getUser().getUserId())
		.cartItemDtos(cart.getCartItems().stream()
			.map(cartItem -> CartItemDto.builder().cartItemId(cartItem.getCartItemId())
				.cartId(cartItem.getCart().getCartId()).cartItemQuantity(cartItem.getQuantity())
				.productId(cartItem.getProduct().getProductId()).build())
			.collect(Collectors.toCollection(HashSet::new)))
		.build();
    }

    static Cart map(final CartDto cartDto) {
	if (cartDto == null)
	    return null;
	Cart cart = Cart.builder()
		.cartId(cartDto.getCartId())
		.user(User.builder().userId(cartDto.getUserId()).build())
		.build();

	Set<CartItem> items = cartDto.getCartItemDtos()
		.stream()
		.map(cartItemDto -> CartItem.builder()
			.cartItemId(cartItemDto.getCartItemId())
			.cart(Cart.builder()
			.cartId(cartItemDto.getCartId()).build())
			.quantity(cartItemDto.getCartItemQuantity())
			.product(Product.builder().productId(cartItemDto.getProductId()).build())
			.build())
		.collect(Collectors.toCollection(HashSet::new));

	cart.setCartItems(items);
	return cart;

    }
}
