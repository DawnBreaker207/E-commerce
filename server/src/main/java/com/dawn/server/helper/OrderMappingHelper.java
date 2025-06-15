package com.dawn.server.helper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import com.dawn.server.dto.OrderDto;
import com.dawn.server.dto.OrderItemDto;
import com.dawn.server.model.Customer;
import com.dawn.server.model.Order;
import com.dawn.server.model.OrderItem;

public interface OrderMappingHelper {
    static OrderDto map(Order order) {
	if (order == null)
	    return null;
	return OrderDto.builder()
		.orderId(order.getOrderId())
		.orderNote(order.getNote())
		.orderTotalPrice(order.getTotalPrice())
		.orderFinalPrice(order.getFinalPrice())
		.customerDto(CustomerMappingHelper.map(order.getCustomer()))
		.createdAt(order.getCreatedAt())
		.updatedAt(order.getUpdatedAt())
		.orderStatus(order.getStatus())
		.orderItemDtos(order.getOrderItems().stream()
			.map(orderItem -> OrderItemDto.builder().orderItemId(orderItem.getOrderItemId())
				.orderPrice(orderItem.getPrice()).orderQuantity(orderItem.getQuantity())
				.productDto(ProductMappingHelper.map(orderItem.getProduct())).build())
			.collect(Collectors.toCollection(HashSet::new)))
		.build();

    }

    static Order map(OrderDto orderDto) {
	if (orderDto == null)
	    return null;
	Order order = Order.builder()
//		.orderId(orderDto.getOrderId())
		.note(orderDto.getOrderNote())
		.totalPrice(orderDto.getOrderTotalPrice())
		.finalPrice(orderDto.getOrderFinalPrice())
		.status(orderDto.getOrderStatus())
		.paymentMethod(orderDto.getOrderPaymentMethod())
//		.customer(CustomerMappingHelper.map(orderDto.getCustomerDto()))
		.build();

	Customer customer = CustomerMappingHelper.map(orderDto.getCustomerDto());

	Set<OrderItem> items = orderDto.getOrderItemDtos().stream()
		.map(orderItem -> OrderItem.builder()
//			.orderItemId(orderItem.getOrderItemId())
			.price(orderItem.getOrderPrice())
			.quantity(orderItem.getOrderQuantity())
			.product(ProductMappingHelper.map(orderItem.getProductDto())).order(order).build())
		.collect(Collectors.toCollection(HashSet::new));

	order.setOrderItems(items);
	order.setCustomer(customer);
	return order;
    }
}
