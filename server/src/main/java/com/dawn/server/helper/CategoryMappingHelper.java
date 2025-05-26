package com.dawn.server.helper;

import com.dawn.server.dto.CategoryDto;
import com.dawn.server.model.Category;

public interface CategoryMappingHelper {
    static CategoryDto map(final Category category) {
	return CategoryDto.builder().categoryId(category.getCategoryId()).categoryTitle(category.getCategoryTitle())
		.imageUrl(category.getImageUrl()).build();
    }

    static Category map(CategoryDto categoryDto) {
	return Category.builder().categoryId(categoryDto.getCategoryId()).categoryTitle(categoryDto.getCategoryTitle())
		.imageUrl(categoryDto.getImageUrl()).build();
    }
}
