package com.dawn.server.dto;

import java.io.Serial;
import java.io.Serializable;
import java.util.Set;

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
public class CartDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Integer cartId;

    private String userId;

    @JsonProperty("cart_item")
    @JsonInclude(Include.NON_NULL)
    private Set<CartItemDto> cartItemDtos;

}
