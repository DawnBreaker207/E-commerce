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

import com.dawn.server.model.Category;
import com.dawn.server.service.CategoryService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
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
    public ResponseEntity<List<Category>> findAll() {
	return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("{categoryId}")
    public ResponseEntity<Category> findOne(
	    @PathVariable("categoryId") @NotBlank(message = "Input must not be blank") @Valid final String categoryId) {
	return ResponseEntity.ok(categoryService.findOne(Long.parseLong(categoryId)));
    }

    @PostMapping
    public ResponseEntity<Category> save(
	    @RequestBody @NotNull(message = "Input must not be null") @Valid final Category category) {
	return ResponseEntity.ok(categoryService.save(category));
    }

    @PutMapping("{categoryId}")
    public ResponseEntity<Category> update(
	    @PathVariable("categoryId") @NotBlank(message = "Input must not be blank") @Valid final String categoryId,
	    @RequestBody @NotNull(message = "Input must not be null") @Valid final Category category) {
	return ResponseEntity.ok(categoryService.update(Long.parseLong(categoryId), category));
    }
    
    @DeleteMapping("{categoryId}")
    public ResponseEntity<Boolean> delete( @PathVariable("categoryId") @NotBlank(message = "Input must not be blank") @Valid final String categoryId){
	return ResponseEntity.ok(categoryService.deleteById(Long.parseLong(categoryId)));
    }

}
