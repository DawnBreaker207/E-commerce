package com.dawn.server.dto;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.dawn.server.constrant.enums.OrderStatus;
import com.dawn.server.constrant.enums.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderFilterDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String query;

    private OrderStatus status;

    private PaymentStatus paymentStatus;

    private Integer finalPrice;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateFrom;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateTo;

    
    private String sortBy;

    private String sortDirection;
}
