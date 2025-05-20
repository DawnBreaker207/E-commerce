package com.dawn.server.service;

import java.util.List;

import com.dawn.server.model.Category;

public interface CategoryService {
    List<Category> findAll();

    Category findOne(Long categoryId);

    Category save(Category category);

    Category update(Long categoryId, Category category);

    boolean deleteById(Long categoryId);
}
