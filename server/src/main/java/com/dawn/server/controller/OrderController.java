package com.dawn.server.controller;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dawn.server.dto.OrderDto;
import com.dawn.server.dto.OrderExportRequestDto;
import com.dawn.server.dto.OrderFilterDto;
import com.dawn.server.response.ApiResponse;
import com.dawn.server.response.ApiResponsePagination;
import com.dawn.server.service.OrderService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<OrderDto>>> findAll() {

	var response = ApiResponse.<List<OrderDto>>builder().message("Get Order Success").data(orderService.findAll())
		.build();
	return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponsePagination<List<OrderDto>>> findAll(@ModelAttribute OrderFilterDto filter,
	    @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {

	Page<OrderDto> orderPage = orderService.findAll(page, size, filter);

	var response = ApiResponsePagination.<List<OrderDto>>builder().message("Get Query Success")
		.data(orderPage.getContent()).totalPages(orderPage.getTotalPages())
		.totalElements(orderPage.getTotalElements()).pageSize(orderPage.getSize())
		.currentPage(orderPage.getNumber()).hasPrevious(orderPage.hasPrevious()).hasNext(orderPage.hasNext())
		.build();

	return ResponseEntity.ok(response);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderDto>> findById(
	    @PathVariable("orderId") @NotBlank(message = "Input must not be blank") @Valid final String orderId) {

	var response = ApiResponse.<OrderDto>builder().message("Get Query Success")
		.data(orderService.findById(Integer.parseInt(orderId))).build();
	return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<OrderDto>> save(
	    @RequestBody @NotNull(message = "Input must not be NULL") @Valid final OrderDto orderDto) {

	var response = ApiResponse.<OrderDto>builder().message("Get Query Success").data(orderService.save(orderDto))
		.build();
	return ResponseEntity.ok(response);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderDto>> update(
	    @PathVariable("orderId") @NotBlank(message = "Input must not be blank") @Valid final String orderId,
	    @RequestBody @NotNull(message = "Input must not be NULL") @Valid final OrderDto orderDto) {
	var response = ApiResponse.<OrderDto>builder().message("Update Order Success")
		.data(orderService.update(Integer.parseInt(orderId), orderDto)).build();
	return ResponseEntity.ok(response);

    }

    @PatchMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderDto>> updateStatus(
	    @PathVariable("orderId") @NotBlank(message = "Input must not be blank") @Valid final String orderId,
	    @RequestBody @NotNull(message = "Input must not be NULL") @Valid final OrderDto orderDto) {
	var response = ApiResponse.<OrderDto>builder().message("Update Order Status Success")
		.data(orderService.update(Integer.parseInt(orderId), orderDto)).build();
	return ResponseEntity.ok(response);

    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Boolean> deleteById(@PathVariable("orderId") final String orderId) {
	orderService.deleteById(Integer.parseInt(orderId));

	return ResponseEntity.ok(true);
    }

    @GetMapping("/existOrderId")
    public Boolean existByOrderId(Integer orderId) {
	return orderService.existByOrderId(orderId);
    }

    @PostMapping("/export")
    public ResponseEntity<byte[]> exportOrders(@RequestBody OrderExportRequestDto request) {
	byte[] excelData = orderService.exportOrdersToExcel(request);

	String filename = request.getFilename() != null ? request.getFilename() + ".xlsx"
		: "order_export_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"))
			+ ".xlsx";

	return ResponseEntity.ok()
		.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="+filename)
		.contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
		.body(excelData);
    }
}
