package com.dawn.server.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.dawn.server.dto.CustomerDto;
import com.dawn.server.dto.OrderDto;
import com.dawn.server.exceptions.wrapper.OrderNotFoundException;
import com.dawn.server.helper.CustomerMappingHelper;
import com.dawn.server.helper.OrderMappingHelper;
import com.dawn.server.model.Customer;
import com.dawn.server.model.Order;
import com.dawn.server.repository.CustomerRepository;
import com.dawn.server.repository.OrderRepository;
import com.dawn.server.service.OrderService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final CustomerRepository customerRepository;

    @Override
    public List<OrderDto> findAll() {
	var orders = orderRepository.findAll();
	return orders.stream().map(OrderMappingHelper::map).toList();
    }

    @Override
    public Page<OrderDto> findAll(int page, int size, String sortBy, String sortOrder) {
	Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), sortBy);
	Pageable pageable = PageRequest.of(page, size, sort);

	Page<Order> orders = orderRepository.findAll(pageable);

	List<OrderDto> orderDtos = orders.stream().map(OrderMappingHelper::map).toList();

	return new PageImpl<>(orderDtos, pageable, orders.getTotalElements());
    }

    @Override
    public OrderDto findById(Integer orderId) {
	Order order = orderRepository.findById(orderId)
		.orElseThrow(() -> new OrderNotFoundException("Order with id " + orderId + " not found"));

	return OrderMappingHelper.map(order);
    }

    @Override
    public OrderDto save(OrderDto orderDto) {
	CustomerDto customerDto = orderDto.getCustomerDto();
	Customer customer = customerRepository.findById(customerDto.getCustomerId()).orElse(null);

	if (customer == null) {
	    customer = CustomerMappingHelper.map(customerDto);
	    customer = customerRepository.save(customer);
	}


	orderDto.setCustomerDto(CustomerMappingHelper.map(customer));

	Order orderEntity = OrderMappingHelper.map(orderDto);
	orderEntity.setCustomer(customer);
	Order savedOrder = orderRepository.save(orderEntity);

	return OrderMappingHelper.map(savedOrder);
    }

    @Override
    public OrderDto update(Integer orderId, OrderDto orderDto) {
	Order existingOrder = orderRepository.findById(orderId)
		.orElseThrow(() -> new OrderNotFoundException("Order with id " + orderId + " not found"));

	OrderMappingHelper.map(existingOrder);
	Order saved = orderRepository.save(existingOrder);

	return OrderMappingHelper.map(saved);
    }

    @Override
    public void deleteById(Integer orderId) {
	orderRepository.deleteById(orderId);
    }

    @Override
    public Boolean existByOrderId(Integer orderId) {
	return orderRepository.findById(orderId).isPresent();

    }

}
