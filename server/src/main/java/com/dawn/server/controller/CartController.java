package com.dawn.server.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dawn.server.dto.CartDto;
import com.dawn.server.service.CartService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/carts")
@Tag(name = "CartController", description = "Operations related to carts")
@Validated
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<List<CartDto>> findAll() {
	return ResponseEntity.ok(cartService.findAll());
    }

    @GetMapping("/all")
    public ResponseEntity<Page<CartDto>> findAll(@RequestParam(defaultValue = "0") int page,
	    @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "createdAt") String sortBy,
	    @RequestParam(defaultValue = "asc") String sortOrder) {
	return ResponseEntity.ok(cartService.findAll(page, size, sortBy, sortOrder));
    }

//    @GetMapping("/{cartId}")
//    public ResponseEntity<CartDto> findById(
//	    @PathVariable("cartId") @NotBlank(message = "Input must not be blank") @Valid final String cartId) {
//	return ResponseEntity.ok(cartService.findById(Integer.parseInt(cartId)));
//    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartDto> findByUserId(
	    @PathVariable("userId") @NotBlank(message = "Input must not be blank") @Valid final String userId) {
	return ResponseEntity.ok(cartService.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<CartDto> save(
	    @RequestBody @NotNull(message = "Input must not be NULL") @Valid final CartDto cartDto) {
	return ResponseEntity.ok(cartService.save(cartDto));
    }

    @PutMapping("/{cartId}")
    public ResponseEntity<CartDto> update(
	    @PathVariable("cartId") @NotBlank(message = "Input must not be blank") @Valid final String cartId,
	    @RequestBody @NotNull(message = "Input must not be NULL") @Valid final CartDto cartDto) {
	return ResponseEntity.ok(cartService.update(Integer.parseInt(cartId), cartDto));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Boolean> deleteById(@PathVariable("cartId") final String cartId) {
	cartService.deleteById(Integer.parseInt(cartId));
	return ResponseEntity.ok(true);
    }

}
