package com.dawn.server.service;

import java.util.List;

import com.dawn.server.dto.CategoryDto;

public interface CategoryService {
    List<CategoryDto> findAll();

    CategoryDto findOne(final Long categoryId);

    CategoryDto save(final CategoryDto category);

    CategoryDto update(final Long categoryId, final CategoryDto category);

    boolean deleteById(final Long categoryId);
}
