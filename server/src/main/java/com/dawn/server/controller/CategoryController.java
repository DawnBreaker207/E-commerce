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

import com.dawn.server.dto.CategoryDto;
import com.dawn.server.response.ApiResponse;
import com.dawn.server.service.CategoryService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryDto>>> findAll() {
	var response = ApiResponse.<List<CategoryDto>>builder().message("Get category success")
		.data(categoryService.findAll()).build();
	return ResponseEntity.ok(response);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<ApiResponse<CategoryDto>> findOne(
	    @PathVariable("categoryId") @NotBlank(message = "Input must not be blank") @Valid final String categoryId) {
	var response = ApiResponse.<CategoryDto>builder().message("Get category success")
		.data(categoryService.findOne(Integer.parseInt(categoryId))).build();
	return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<CategoryDto> save(
	    @RequestBody @NotNull(message = "Input must not be null") @Valid final CategoryDto categoryDto) {
	return ResponseEntity.ok(categoryService.save(categoryDto));
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDto> update(
	    @PathVariable("categoryId") @NotBlank(message = "Input must not be blank") @Valid final String categoryId,
	    @RequestBody @NotNull(message = "Input must not be null") @Valid final CategoryDto categoryDto) {
	return ResponseEntity.ok(categoryService.update(Integer.parseInt(categoryId), categoryDto));
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Boolean> delete(
	    @PathVariable("categoryId") @NotBlank(message = "Input must not be blank") @Valid final String categoryId) {
	return ResponseEntity.ok(categoryService.deleteById(Integer.parseInt(categoryId)));
    }

}
