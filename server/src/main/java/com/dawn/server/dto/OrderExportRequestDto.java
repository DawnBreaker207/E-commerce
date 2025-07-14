package com.dawn.server.dto;

import java.time.Instant;
import java.util.List;

import com.dawn.server.constrant.enums.OrderStatus;
import com.dawn.server.constrant.enums.PaymentMethod;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderExportRequestDto {
    private List<Integer> orderIds;
    private String filename;

//    Filter Options
    private OrderStatus orderStatus;
    private PaymentMethod paymentMethod;
    private Instant startDate;
    private Instant endDate;
}
