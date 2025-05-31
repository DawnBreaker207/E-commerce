package com.dawn.server.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.Set;

import com.dawn.server.constrant.enums.OrderStatus;
import com.dawn.server.constrant.enums.PaymentMethod;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Integer orderId;

    @JsonProperty("user")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UserDto userDto;

    private Integer orderTotalPrice;

    private Integer orderFinalPrice;

    private String orderNote;

    private OrderStatus orderStatus;

    private PaymentMethod orderPaymentMethod;

    @JsonProperty("cart_id")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer cartId;

    @JsonProperty("order_items")
    @JsonInclude(Include.NON_NULL)
    private Set<OrderItemDto> orderItemDtos;

}
