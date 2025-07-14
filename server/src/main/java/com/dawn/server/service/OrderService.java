package com.dawn.server.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.dawn.server.dto.OrderDto;
import com.dawn.server.dto.OrderExportRequestDto;
import com.dawn.server.dto.OrderFilterDto;

public interface OrderService {
    List<OrderDto> findAll();

    Page<OrderDto> findAll(int page, int size, OrderFilterDto filter);

    OrderDto findById(Integer orderId);

    OrderDto save(final OrderDto orderDto);

    OrderDto update(final Integer orderId, final OrderDto orderDto);

    void deleteById(final Integer orderId);

    Boolean existByOrderId(Integer orderId);
    
    byte[] exportOrdersToExcel(OrderExportRequestDto request);
}
