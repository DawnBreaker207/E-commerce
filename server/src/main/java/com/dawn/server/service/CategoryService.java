package com.dawn.server.service;

import java.util.List;

import com.dawn.server.dto.CategoryDto;

public interface CategoryService {
    List<CategoryDto> findAll();

    CategoryDto findOne(final Integer categoryId);

    CategoryDto save(final CategoryDto category);

    CategoryDto update(final Integer categoryId, final CategoryDto category);

    boolean deleteById(final Integer categoryId);
}
