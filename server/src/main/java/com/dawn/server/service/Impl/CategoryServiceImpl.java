package com.dawn.server.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dawn.server.exceptions.wrapper.CategoryNotFoundException;
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
    public List<Category> findAll() {
	return categoryRepository.findAll();
    }

    @Override
    public Category findOne(Long categoryId) {
	return categoryRepository.findById(categoryId).orElseThrow(
		() -> new CategoryNotFoundException(String.format("Category with id[%d] not found", categoryId)));
    }

    @Override
    public Category save(Category category) {
	return categoryRepository.save(category);
    }

    @Override
    public Category update(Long categoryId, Category category) {
	try {
	    Category existingCategory = categoryRepository.findById(categoryId).orElseThrow(
		    () -> new CategoryNotFoundException(String.format("Category with id[%d] not found", categoryId)));

	    return categoryRepository.save(category);
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
