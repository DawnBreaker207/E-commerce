package com.dawn.server.dto;

import java.io.Serial;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Integer cartItemId;

    private Integer cartId;

    private Integer productId;

    @JsonProperty("quantity")
    @JsonInclude
    private Integer cartItemQuantity;

}
