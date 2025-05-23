package com.dawn.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dawn.server.model.Product;
import com.dawn.server.service.ProductService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
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
    public ResponseEntity<List<Product>> findAll() {
	return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("{productId}")
    public ResponseEntity<Product> findOne(
	    @PathVariable @NotBlank(message = "Product must not be blank") @Valid final String productId) {
	return ResponseEntity.ok(productService.findOne(Long.parseLong(productId)));
    }

    @PostMapping
    public ResponseEntity<Product> save(
	    @RequestBody @NotNull(message = "Input must not be null") @Valid final Product product) {
	return ResponseEntity.ok(productService.save(product));
    }

    @PutMapping("{productId}")
    public ResponseEntity<Product> update(
	    @PathVariable @NotBlank(message = "Product must not be blank") @Valid final String productId,
	    @RequestBody @NotNull(message = "Input must not be null") @Valid final Product product) {
	return ResponseEntity.ok(productService.update(Long.parseLong(productId), product));
    }

    @DeleteMapping("{productId}")
    public ResponseEntity<Boolean> delete(
	    @PathVariable @NotBlank(message = "Product must not be blank") @Valid final String productId) {
	return ResponseEntity.ok(productService.deleteById(Long.parseLong(productId)));
    }
}
