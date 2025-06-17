package com.dawn.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dawn.server.dto.ProductDto;
import com.dawn.server.response.ApiResponse;
import com.dawn.server.service.ProductService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductDto>>> findAll() {
	var response = ApiResponse.<List<ProductDto>>builder().message("Get product success")
		.data(productService.findAll()).build();
	return ResponseEntity.ok(response);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<ProductDto>> findOne(
	    @PathVariable @NotBlank(message = "Product must not be blank") @Valid final String productId) {

	var response = ApiResponse.<ProductDto>builder().message("Get product success")
		.data(productService.findOne(Integer.parseInt(productId))).build();
	return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductDto>> save(
	    @RequestBody @NotNull(message = "Input must not be null") @Valid final ProductDto productDto) {

	var response = ApiResponse.<ProductDto>builder().message("Create product success")
		.data(productService.save(productDto)).build();
	return ResponseEntity.ok(response);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ApiResponse<ProductDto>> update(
	    @PathVariable @NotBlank(message = "Product must not be blank") @Valid final String productId,
	    @RequestBody @NotNull(message = "Input must not be null") @Valid final ProductDto productDto) {
	var response = ApiResponse.<ProductDto>builder().message("Update product success")
		.data(productService.update(Integer.parseInt(productId), productDto)).build();
	return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<Boolean>> delete(
	    @PathVariable @NotBlank(message = "Product must not be blank") @Valid final String productId) {
	var response = ApiResponse.<Boolean>builder().message("Update product success")
		.data(productService.deleteById(Integer.parseInt(productId))).build();
	return ResponseEntity.ok(response);
    }
}
