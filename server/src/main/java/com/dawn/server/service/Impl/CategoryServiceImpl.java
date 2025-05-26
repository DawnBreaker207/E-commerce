package com.dawn.server.service.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dawn.server.dto.CategoryDto;
import com.dawn.server.exceptions.wrapper.CategoryNotFoundException;
import com.dawn.server.helper.CategoryMappingHelper;
import com.dawn.server.model.Category;
import com.dawn.server.repository.CategoryRepository;
import com.dawn.server.service.CategoryService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryDto> findAll() {
	List<Category> categories = categoryRepository.findAll();
	return categories.stream().map(CategoryMappingHelper::map).distinct().collect(Collectors.toList());
    }

    @Override
    public CategoryDto findOne(Long categoryId) {
	return categoryRepository.findById(categoryId).map(CategoryMappingHelper::map).orElseThrow(
		() -> new CategoryNotFoundException(String.format("Category with id[%d] not found", categoryId)));
    }

    @Override
    public CategoryDto save(CategoryDto categoryDto) {
	Category category = CategoryMappingHelper.map(categoryDto);
	Category saved = categoryRepository.save(category);

	return CategoryMappingHelper.map(saved);

    }

    @Override
    public CategoryDto update(Long categoryId, CategoryDto categoryDto) {
	try {
	    Category existingCategory = categoryRepository.findById(categoryId).orElseThrow(
		    () -> new CategoryNotFoundException(String.format("Category with id[%d] not found", categoryId)));

	    Category category = CategoryMappingHelper.map(categoryDto);
	    Category saved = categoryRepository.save(category);
	    return CategoryMappingHelper.map(saved);
	} catch (CategoryNotFoundException e) {
	    throw new CategoryNotFoundException(String.format("Category with id[%d] not found", categoryId));
	} catch (Exception e) {
	    throw new CategoryNotFoundException("Error updating category", e);
	}
    }

    @Override
    public boolean deleteById(Long categoryId) {
	try {
	    categoryRepository.deleteById(categoryId);

	    return true;
	} catch (CategoryNotFoundException e) {
	    throw new CategoryNotFoundException(String.format("Category with id[%d] not found", categoryId));
	}

    }

}
