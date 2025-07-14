package com.dawn.server.service.Impl;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.dawn.server.dto.CustomerDto;
import com.dawn.server.dto.OrderDto;
import com.dawn.server.dto.OrderExportRequestDto;
import com.dawn.server.dto.OrderFilterDto;
import com.dawn.server.exceptions.wrapper.OrderNotFoundException;
import com.dawn.server.helper.CustomerMappingHelper;
import com.dawn.server.helper.OrderMappingHelper;
import com.dawn.server.model.Customer;
import com.dawn.server.model.Order;
import com.dawn.server.repository.CustomerRepository;
import com.dawn.server.repository.OrderRepository;
import com.dawn.server.service.OrderService;
import com.dawn.server.specifications.OrderSpecifications;

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
    public Page<OrderDto> findAll(int page, int size, OrderFilterDto filter) {

	Sort sort = Sort.by(
		Sort.Direction.fromString(filter.getSortDirection() != null ? filter.getSortDirection() : "asc"),
		filter.getSortBy() != null ? filter.getSortBy() : "createdAt");

	Pageable pageable = PageRequest.of(page, size, sort);

	Specification<Order> spec = Specification.where(OrderSpecifications.hasStatus(filter.getStatus()))
		.and(OrderSpecifications.hasPaymentStatus(filter.getPaymentStatus()))
		.and(OrderSpecifications.hasCreatedAtBetween(filter.getDateFrom(), filter.getDateTo()))
		.and(OrderSpecifications.hasQuery(filter.getQuery()));

	Page<Order> orders = orderRepository.findAll(spec, pageable);

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

	if (orderDto.getOrderStatus() != null) {
	    existingOrder.setStatus(orderDto.getOrderStatus());
	}

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

    @Override
    public byte[] exportOrdersToExcel(OrderExportRequestDto request) {
//	Get order based on request
	List<Order> orders = getOrdersForExport(request);

//	Convert to DTOs
	List<OrderDto> orderDtos = orders.stream().map(OrderMappingHelper::map).collect(Collectors.toList());

//	Generate filenae if not provided
	String filename = request.getFilename() != null ? request.getFilename() : generateDefaultFilename();

//	Export to Excel 
	return createExcelFile(orderDtos, filename);
    }

    private List<Order> getOrdersForExport(OrderExportRequestDto request) {
	if (request.getOrderIds() != null && !request.getOrderIds().isEmpty()) {
//	    Export specific orders
	    return orderRepository.findAllById(request.getOrderIds());
	} else {
//	    Export with filters
	    return orderRepository.findOrdersWithFilters(request.getOrderStatus(), request.getPaymentMethod(),
		    request.getStartDate(), request.getEndDate());
	}
    }

    private byte[] createExcelFile(List<OrderDto> orders, String filename) {
	try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
	    Sheet sheet = workbook.createSheet("Orders");

//	    Create header row
	    Row headerRow = sheet.createRow(0);
	    String[] headers = { "Order ID", "Customer Name", "Customer Email", "Customer Phone", "Total Price",
		    "Final Price", "Order Status", "Payment Method", "Order Note", "Created At", "Updated At" };

//	    Style header
	    CellStyle headerStyle = workbook.createCellStyle();
	    Font headerFont = workbook.createFont();
	    headerFont.setBold(true);
	    headerStyle.setFont(headerFont);

	    for (int i = 0; i < headers.length; i++) {
		Cell cell = headerRow.createCell(i);
		cell.setCellValue(headers[i]);
		cell.setCellStyle(headerStyle);
	    }

//	    Fill data rows
	    int rowNum = 1;
	    for (OrderDto order : orders) {
		Row row = sheet.createRow(rowNum++);

		row.createCell(0).setCellValue(order.getOrderId());
		row.createCell(1)
			.setCellValue(order.getCustomerDto() != null
				? order.getCustomerDto().getFirstName() + " " + order.getCustomerDto().getLastName()
				: "");
		row.createCell(2).setCellValue(order.getCustomerDto() != null ? order.getCustomerDto().getEmail() : "");
		row.createCell(3).setCellValue(order.getCustomerDto() != null ? order.getCustomerDto().getPhone() : "");
		row.createCell(4).setCellValue(order.getOrderTotalPrice());
		row.createCell(5).setCellValue(order.getOrderFinalPrice());
		row.createCell(6).setCellValue(order.getOrderStatus() != null ? order.getOrderStatus().toString() : "Pending");
		row.createCell(7).setCellValue(order.getOrderPaymentMethod() != null ? order.getOrderPaymentMethod().toString() : "Pending");
		row.createCell(8).setCellValue(order.getOrderNote());
		row.createCell(9).setCellValue(order.getCreatedAt() != null ? order.getCreatedAt().toString() : "");
		row.createCell(10).setCellValue(order.getUpdatedAt() != null ? order.getUpdatedAt().toString() : "");
	    }

//	    Auto-size columns
	    for (int i = 0; i < headers.length; i++) {
		sheet.autoSizeColumn(i);
	    }

	    workbook.write(out);
	    return out.toByteArray();
	} catch (Exception e) {
	    throw new RuntimeException("Failed to export orders to Excel", e);
	}
    }

    private String generateDefaultFilename() {
	LocalDateTime now = LocalDateTime.now();
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmSS");
	return "order_export" + now.format(formatter);
    }

}
