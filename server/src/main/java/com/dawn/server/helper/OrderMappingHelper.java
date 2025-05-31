package com.dawn.server.helper;

import java.util.stream.Collectors;

import com.dawn.server.dto.OrderDto;
import com.dawn.server.dto.OrderItemDto;
import com.dawn.server.model.Cart;
import com.dawn.server.model.Order;
import com.dawn.server.model.OrderItem;
import com.dawn.server.model.User;

public interface OrderMappingHelper {
    static OrderDto map(Order order) {
	if(order == null) return null;
	return OrderDto
		.builder()
		.orderId(order.getOrderId())
		.orderNote(order.getNote())
		.orderTotalPrice(order.getTotalPrice())
		.orderFinalPrice(order.getFinalPrice())
		.cartId(order.getCart().getCartId())
		.userDto(UserMappingHelper.map(order.getUser()))
		.orderItemDtos(order.getOrderItems()
				.stream()
				.map(orderItem -> OrderItemDto
					.builder()
					.orderItemId(orderItem.getOrderItemId())
					.orderPrice(orderItem.getPrice())
					.orderQuantity(orderItem.getQuantity())
					.productDto(ProductMappingHelper.map(orderItem.getProduct()))
					.build())
				.collect(Collectors.toSet()))
		.build();
	
    }
    
    static Order map(OrderDto orderDto) {
	if(orderDto == null) return null;
	return Order
		.builder()
		.orderId(orderDto.getOrderId())
		.note(orderDto.getOrderNote())
		.totalPrice(orderDto.getOrderTotalPrice())
		.finalPrice(orderDto.getOrderTotalPrice())
		.cart(Cart.builder().cartId(orderDto.getCartId()).build())
		.user(User.builder().userId(orderDto.getUserDto().getUserId()).build())
    		.orderItems(orderDto.getOrderItemDtos()
    				.stream()
    				.map(orderItem -> OrderItem
    					.builder()
    					.orderItemId(orderItem.getOrderItemId())
    					.price(orderItem.getOrderPrice())
    					.quantity(orderItem.getOrderPrice())
    					.product(ProductMappingHelper.map(orderItem.getProductDto()))
    					.build())
    				.collect(Collectors.toSet()))
		.build();
    }
}
