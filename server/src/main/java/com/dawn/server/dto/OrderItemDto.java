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
public class OrderItemDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Integer orderItemId;

    private Integer orderQuantity;

    private Integer orderPrice;

    private Integer orderDiscount;

    @JsonProperty("product")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ProductDto productDto;


}
