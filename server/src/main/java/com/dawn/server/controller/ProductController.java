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
    public ResponseEntity<List<ProductDto>> findAll() {
	return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("{productId}")
    public ResponseEntity<ProductDto> findOne(
	    @PathVariable @NotBlank(message = "Product must not be blank") @Valid final String productId) {
	return ResponseEntity.ok(productService.findOne(Long.parseLong(productId)));
    }

    @PostMapping
    public ResponseEntity<ProductDto> save(
	    @RequestBody @NotNull(message = "Input must not be null") @Valid final ProductDto productDto) {
	return ResponseEntity.ok(productService.save(productDto));
    }

    @PutMapping("{productId}")
    public ResponseEntity<ProductDto> update(
	    @PathVariable @NotBlank(message = "Product must not be blank") @Valid final String productId,
	    @RequestBody @NotNull(message = "Input must not be null") @Valid final ProductDto productDto) {
	return ResponseEntity.ok(productService.update(Long.parseLong(productId), productDto));
    }

    @DeleteMapping("{productId}")
    public ResponseEntity<Boolean> delete(
	    @PathVariable @NotBlank(message = "Product must not be blank") @Valid final String productId) {
	return ResponseEntity.ok(productService.deleteById(Long.parseLong(productId)));
    }
}
