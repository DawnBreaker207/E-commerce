package com.dawn.server.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dawn.server.dto.OrderDto;
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

    @GetMapping
    public ResponseEntity<List<OrderDto>> findAll() {
	return ResponseEntity.ok(orderService.findAll());
    }

    @GetMapping("/all")
    public ResponseEntity<Page<OrderDto>> findAll(@RequestParam(defaultValue = "0") int page,
	    @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "orderId") String sortBy,
	    @RequestParam(defaultValue = "asc") String sortOrder) {
	return ResponseEntity.ok(orderService.findAll(page, size, sortBy, sortOrder));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> findById(
	    @PathVariable("orderId") @NotBlank(message = "Input must not be blank") @Valid final String orderId) {
	return ResponseEntity.ok(orderService.findById(Integer.parseInt(orderId)));
    }

    @PostMapping
    public ResponseEntity<OrderDto> save(
	    @RequestBody @NotNull(message = "Input must not be NULL") @Valid final OrderDto orderDto) {
	return ResponseEntity.ok(orderService.save(orderDto));
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<OrderDto> update(
	    @PathVariable("orderId") @NotBlank(message = "Input must not be blank") @Valid final String orderId,
	    @RequestBody @NotNull(message = "Input must not be NULL") @Valid final OrderDto orderDto) {

	return ResponseEntity.ok(orderService.update(Integer.parseInt(orderId), orderDto));

    }
    
    @PatchMapping("/{orderId}")
    public ResponseEntity<OrderDto> updateStatus(
	    @PathVariable("orderId") @NotBlank(message = "Input must not be blank") @Valid final String orderId,
	    @RequestBody @NotNull(message = "Input must not be NULL") @Valid final OrderDto orderDto) {

	return ResponseEntity.ok(orderService.update(Integer.parseInt(orderId), orderDto));

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
}
